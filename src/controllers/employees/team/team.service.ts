import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTeamDto,
  EditTeamDto,
} from 'src/definitions/dtos/employees/team';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { DEPARTMENT_MODEL } from 'src/schemas/employees/department';
import { TEAM_MODEL, TeamDocument } from 'src/schemas/employees/team';
import {
  badRequestException,
  conflictException,
  getPagination,
  isValidMongoId,
  notFoundException,
} from 'src/util';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(TEAM_MODEL)
    private readonly teamModel: Model<TeamDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(DEPARTMENT_MODEL)
    private readonly departmentModel: Model<UserDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { teamName, teamLeader, teamManager, teamMembers, department } =
      createTeamDto;

    const [
      teamNameExists,
      isTeamLeaderExists,
      isTeamMangerExists,
      validMembers,
      isDepartmentExists,
    ] = await Promise.all([
      teamName ? this.teamModel.exists({ teamName }) : true,
      teamLeader ? this.userModel.exists({ _id: teamLeader }) : true,
      teamManager ? this.userModel.exists({ _id: teamManager }) : true,
      teamMembers.length > 0
        ? this.userModel.find({ _id: { $in: teamMembers } }, '_id')
        : [],
      department ? this.departmentModel.exists({ _id: department }) : true,
    ]);

    if (teamNameExists) {
      throw conflictException('Team name already exists');
    }

    if (teamLeader && !isTeamLeaderExists) {
      throw notFoundException('Team Leader not found');
    }

    if (teamManager && !isTeamMangerExists) {
      throw notFoundException('Team Manager not found');
    }

    const validMembersIds = validMembers.map((member: any) =>
      member._id.toString(),
    );
    const missingMembers = teamMembers.filter(
      (id) => !validMembersIds.includes(id.toString()),
    );
    if (missingMembers.length > 0) {
      throw notFoundException(
        `Some team members not found: ${missingMembers.join(', ')}`,
      );
    }

    if (department && !isDepartmentExists) {
      throw notFoundException('Department not found');
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
    const { teamName, teamLeader, teamManager, teamMembers, department } =
      editTeamDto;

    const [
      teamNameExists,
      isTeamLeaderExists,
      isTeamMangerExists,
      validMembers,
      isDepartmentExists,
    ] = await Promise.all([
      teamName ? this.teamModel.exists({ teamName }).lean() : null,
      teamLeader ? this.userModel.exists({ _id: teamLeader }).lean() : null,
      teamManager ? this.userModel.exists({ _id: teamManager }).lean() : null,
      teamMembers?.length > 0
        ? this.userModel.find({ _id: { $in: teamMembers } }, '_id').lean()
        : [],
      department
        ? this.departmentModel.exists({ _id: department }).lean()
        : null,
    ]);

    if (teamName && teamNameExists) {
      throw conflictException('Team name already exists');
    }

    if (teamLeader && !isTeamLeaderExists) {
      throw notFoundException('Team Leader not found');
    }

    if (teamManager && !isTeamMangerExists) {
      throw notFoundException('Team Manager not found');
    }

    const validMembersIds = validMembers?.map((member: any) =>
      member?._id?.toString(),
    );
    const missingMembers = teamMembers?.filter(
      (id) => !validMembersIds?.includes(id?.toString()),
    );
    if (missingMembers?.length > 0) {
      throw notFoundException(
        `Some team members not found: ${missingMembers?.join(', ')}`,
      );
    }

    if (department && !isDepartmentExists) {
      throw notFoundException('Department not found');
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
      throw notFoundException('team not found');
    }

    return team;
  }

  async getSingle(id: string): Promise<any> {
    if (!isValidMongoId(id)) {
      throw badRequestException('team id is not valid');
    }

    const team = await this.teamModel.findById(id).lean();
    if (!team) {
      throw notFoundException('team not found');
    }

    return team;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } =
      await getPagination(
        page,
        limit,
        this.teamModel,
        search,
        'teamName',
        'teamLeader teamManager teamMembers department',
      );

    if (items.length === 0) {
      throw notFoundException('Departments not found');
    }

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

  async delete(id: string) {
    if (!isValidMongoId(id)) {
      throw badRequestException('team id is not valid');
    }

    const team = await this.teamModel.findByIdAndDelete(id);
    if (!team) {
      throw notFoundException('team not found');
    }

    return team;
  }
}
