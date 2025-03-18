import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { populate } from 'dotenv';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { EditProjectDto } from 'src/definitions/dtos/project/edit/edit-project.dto';
import { CLIENT_MODEL, ClientDocument } from 'src/schemas/client';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { TEAM_MODEL, TeamDocument } from 'src/schemas/employees/team';
import { PROJECT_MODEL, ProjectDocument } from 'src/schemas/project';
import { badRequestException, conflictException, notFoundException } from 'src/utils';
import {
  createHelper,
  deleteHelper,
  editHelper,
  existsHelper,
  getAllHelper,
  getSingleHelper,
} from 'src/utils/helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(CLIENT_MODEL)
    private readonly clientModel: Model<ClientDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { projectName, clientId, projectLeader, teamMembers } = createProjectDto;

    const [, , , teamMembersData] = await Promise.all([
      projectName ? await existsHelper(projectName, 'projectName', this.projectModel) : null,
      clientId ? await getSingleHelper(clientId, CLIENT_MODEL, this.clientModel) : null,
      projectLeader
        ? await getSingleHelper(projectLeader, 'Project Leader', this.employeeModel)
        : null,
      teamMembers?.length > 0
        ? this.employeeModel.find({ _id: { $in: teamMembers } }, '_id').lean()
        : [],
    ]);

    //* search teamMembers
    const validTeamMemberIds = teamMembersData?.map((member: any) => member._id.toString());

    const missingTeamMembers = teamMembers?.filter(
      (teamMember: any) => !validTeamMemberIds?.includes(teamMember.toString()),
    );
    if (missingTeamMembers?.length > 0) {
      throw notFoundException(`Some TeamMembers not found: ${missingTeamMembers?.join(', ')}`);
    }

    const project = createHelper(createProjectDto, PROJECT_MODEL, this.projectModel);

    return project;
  }

  async edit(editProjectDto: EditProjectDto, id: Types.ObjectId) {
    const { projectName, clientId, projectLeader, teamMembers } = editProjectDto;

    const [, , , teamMembersData] = await Promise.all([
      projectName ? await existsHelper(projectName, 'projectName', this.projectModel) : null,
      clientId ? await getSingleHelper(clientId, CLIENT_MODEL, this.clientModel) : null,
      projectLeader
        ? await getSingleHelper(projectLeader, 'Project Leader', this.employeeModel)
        : null,
      teamMembers?.length > 0
        ? this.employeeModel.find({ _id: { $in: teamMembers } }, '_id').lean()
        : [],
    ]);

    //* search teamMembers
    if (teamMembers?.length > 0) {
      const validTeamMemberIds = teamMembersData?.map((member: any) => member._id.toString());

      const missingTeamMembers = teamMembers?.filter(
        (teamMember: any) => !validTeamMemberIds?.includes(teamMember.toString()),
      );
      if (missingTeamMembers?.length > 0) {
        throw notFoundException(`Some TeamMembers not found: ${missingTeamMembers?.join(', ')}`);
      }
    }

    const project = await editHelper(id, editProjectDto, PROJECT_MODEL, this.projectModel);

    return project;
  }

  async getSingle(id: Types.ObjectId): Promise<any> {
    const project = await getSingleHelper(id, PROJECT_MODEL, this.projectModel);

    return project;
  }

  async getAll(page: string, limit: string, search: string) {
    const { items, totalItems, totalPages, itemsPerPage, currentPage } = await getAllHelper(
      page,
      limit,
      this.projectModel,
      search,
      'projectName',
      [
        {
          path: 'clientId',
          select: 'firstName lastName userName -_id',
        },
        {
          path: 'projectLeader',
          select: 'firstName lastName userName -_id',
        },
        {
          path: 'teamMembers',
          select: 'firstName lastName userName -_id',
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
    const project = await deleteHelper(id, PROJECT_MODEL, this.projectModel);

    return project;
  }
}
