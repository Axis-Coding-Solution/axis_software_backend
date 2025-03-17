import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(TEAM_MODEL)
    private readonly teamModel: Model<TeamDocument>,

    @InjectModel(CLIENT_MODEL)
    private readonly clientModel: Model<ClientDocument>,

    @InjectModel(EMPLOYEE_MODEL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { projectName, clientId, projectLeader, teamId, Stakeholders } = createProjectDto;

    const [, , , isTeamExists, isStakeHoldersExists] = await Promise.all([
      projectName ? await existsHelper(projectName, 'projectName', this.projectModel) : null,
      clientId ? await getSingleHelper(clientId, CLIENT_MODEL, this.clientModel) : null,
      projectLeader
        ? await getSingleHelper(projectLeader, 'Project Leader', this.employeeModel)
        : null,
      teamId?.length > 0 ? this.teamModel.find({ _id: { $in: teamId } }, '_id').lean() : [],
      Stakeholders?.length > 0
        ? this.userModel.find({ _id: { $in: Stakeholders } }, '_id').lean()
        : [],
    ]);

    //* team members
    const validTeamIds = isTeamExists.map((member: any) => member._id.toString());

    const missingTeamMembers = teamId?.filter(
      (teamId: any) => !validTeamIds?.includes(teamId?.toString()),
    );
    if (missingTeamMembers?.length > 0) {
      throw notFoundException(`Some team members not found: ${missingTeamMembers?.join(', ')}`);
    }

    //* stakeholders
    const validStakeholderIds = isStakeHoldersExists?.map((member: any) => member._id.toString());

    const missingStakeholders = Stakeholders?.filter(
      (stakeholder: any) => !validStakeholderIds?.includes(stakeholder.toString()),
    );
    if (missingStakeholders?.length > 0) {
      throw notFoundException(`Some stakeholders not found: ${missingStakeholders?.join(', ')}`);
    }

    // let { tags } = createProjectDto;
    // if (tags) {
    //   tags = JSON.parse(tags).map((tag: any) => tag?.value);
    // }

    const project = await this.projectModel.create(createProjectDto);
    if (!project) {
      throw badRequestException('Project not created');
    }

    return project;
  }

  async edit(editProjectDto: EditProjectDto, id: Types.ObjectId) {
    const { projectName, clientId, projectLeader, teamId, Stakeholders } = editProjectDto;

    const [, , , isTeamExists, isStakeHoldersExists] = await Promise.all([
      projectName ? await existsHelper(projectName, 'projectName', this.projectModel) : null,
      clientId ? await getSingleHelper(clientId, CLIENT_MODEL, this.clientModel) : null,
      projectLeader
        ? await getSingleHelper(projectLeader, 'Project Leader', this.employeeModel)
        : null,
      teamId?.length > 0 ? this.teamModel.find({ _id: { $in: teamId } }, '_id').lean() : [],
      Stakeholders?.length > 0
        ? this.userModel.find({ _id: { $in: Stakeholders } }, '_id').lean()
        : [],
    ]);

    //* team members
    if (teamId && teamId?.length > 0) {
      const validTeamIds = isTeamExists.map((member: any) => member._id.toString());
      const missingTeamMembers = teamId?.filter(
        (teamId: any) => !validTeamIds?.includes(teamId?.toString()),
      );
      if (missingTeamMembers?.length > 0) {
        throw notFoundException(`Some team members not found: ${missingTeamMembers?.join(', ')}`);
      }
    }

    //* stakeholders
    if (Stakeholders && Stakeholders?.length > 0) {
      const validStakeholderIds = isStakeHoldersExists?.map((member: any) => member._id.toString());

      const missingStakeholders = Stakeholders?.filter(
        (stakeholder: any) => !validStakeholderIds?.includes(stakeholder.toString()),
      );
      if (missingStakeholders?.length > 0) {
        throw notFoundException(`Some stakeholders not found: ${missingStakeholders?.join(', ')}`);
      }
    }

    // let { tags } = editProjectDto;
    // if (tags) {
    //   tags = JSON.parse(tags).map((tag: any) => tag?.value);
    // }

    const updateData: any = { ...editProjectDto };

    const project = await editHelper(id, updateData, PROJECT_MODEL, this.projectModel);

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
          path: 'teamId',
          select: 'teamName teamMembers -_id',
        },
        {
          path: 'Stakeholders',
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
