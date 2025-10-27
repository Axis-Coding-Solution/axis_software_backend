import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTeamDto, EditTeamDto } from 'src/definitions/dtos/employees/team';
import { UserDocument } from 'src/schemas/commons/user';
import { DEPARTMENT_MODEL } from 'src/schemas/employees/department';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { TEAM_MODEL, TeamDocument } from 'src/schemas/employees/team';
import { CustomNotFoundException } from 'src/utils';
import { deleteHelper, existsHelper, getAllHelper, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TEAM_MODEL)
    private readonly teamModel: Model<TeamDocument>,

    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<UserDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { teamName, teamLeader, teamManager, teamMembers, department } = createTeamDto;

    const [, , , validMembers] = await Promise.all([
      teamName ? await existsHelper(teamName, 'teamName', this.teamModel) : null,
      teamLeader ? await getSingleHelper(teamLeader, 'Team Leader', this.employeeModel) : null,
      teamManager ? await getSingleHelper(teamManager, 'Team Manager', this.employeeModel) : null,
      teamMembers.length > 0 ? this.employeeModel.find({ _id: { $in: teamMembers } }, '_id') : [],
      department ? await getSingleHelper(department, DEPARTMENT_MODEL, this.departmentModel) : true,
    ]);

    const validMembersIds = validMembers.map((member: any) => member._id.toString());
    const missingMembers = teamMembers.filter((id) => !validMembersIds.includes(id.toString()));
    if (missingMembers?.length > 0) {
      throw CustomNotFoundException(`Some team members not found: ${missingMembers?.join(', ')}`);
    }

    const team = await this.teamModel.create({
      teamName,
      teamMembers: teamMembers || [],
      teamLeader: teamLeader || null,
      teamManager: teamManager || null,
      department: department || null,
    });

    return team;
  }

  async edit(editTeamDto: EditTeamDto, id: string): Promise<any> {
    const { teamName, teamLeader, teamManager, teamMembers, department } = editTeamDto;

    const [, , , validMembers] = await Promise.all([
      teamName ? await existsHelper(teamName, 'teamName', this.teamModel) : null,
      teamLeader ? await getSingleHelper(teamLeader, 'Team Leader', this.employeeModel) : null,
      teamManager ? await getSingleHelper(teamManager, 'Team Manager', this.employeeModel) : null,
      teamMembers.length > 0 ? this.employeeModel.find({ _id: { $in: teamMembers } }, '_id') : [],
      department ? await getSingleHelper(department, DEPARTMENT_MODEL, this.departmentModel) : true,
    ]);

    const validMembersIds = validMembers.map((member: any) => member._id.toString());
    const missingMembers = teamMembers.filter((id) => !validMembersIds.includes(id.toString()));
    if (missingMembers?.length > 0) {
      throw CustomNotFoundException(`Some team members not found: ${missingMembers?.join(', ')}`);
    }

    const updateData: Partial<EditTeamDto> = {};
    if (teamName) updateData.teamName = teamName;
    if (teamLeader) updateData.teamLeader = teamLeader;
    if (teamManager) updateData.teamManager = teamManager;
    if (teamMembers) updateData.teamMembers = teamMembers;

    const team = await this.teamModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
      },
      { new: true, lean: true },
    );
    if (!team) {
      throw CustomNotFoundException('team not found');
    }

    return team;
  }

  async getSingle(id: Types.ObjectId): Promise<any> {
    const team = getSingleHelper(id, TEAM_MODEL, this.teamModel);

    return team;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.teamModel,
      search,
      'teamName',
      [
        {
          path: 'teamLeader',
          select: 'firstName lastName userName -_id',
        },
        {
          path: 'teamManager',
          select: 'firstName lastName userName -_id',
        },
        {
          path: 'teamMembers',
          select: 'firstName lastName userName -_id',
        },
        {
          path: 'department',
          select: 'departmentName -_id',
        },
      ],
    );

    return {
      data: items,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
      },
    };
  }

  async delete(id: Types.ObjectId) {
    const team = deleteHelper(id, TEAM_MODEL, this.teamModel);

    return team;
  }
}
