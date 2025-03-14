import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { EditProjectDto } from 'src/definitions/dtos/project/edit/edit-project.dto';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { TEAM_MODEL, TeamDocument } from 'src/schemas/employees/team';
import { PROJECT_MODEL, ProjectDocument } from 'src/schemas/project';
import { badRequestException, conflictException, notFoundException } from 'src/utils';
import { deleteHelper, getAllHelper, getSingleHelper } from 'src/utils/helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(TEAM_MODEL)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { projectName, clientId, projectLeader, teamId, Stakeholders } = createProjectDto;

    const [
      isProjectNameExists,
      isClientExists,
      isProjectLeaderExists,
      isTeamExists,
      isStakeHoldersExists,
    ] = await Promise.all([
      projectName ? this.projectModel.exists({ projectName }).lean() : true,
      clientId ? this.userModel.findById(clientId).lean() : null,
      projectLeader ? this.userModel.findById(projectLeader).lean() : null,
      teamId?.length > 0 ? this.teamModel.find({ _id: { $in: teamId } }, '_id').lean() : [],
      Stakeholders?.length > 0
        ? this.userModel.find({ _id: { $in: Stakeholders } }, '_id').lean()
        : [],
    ]);

    if (isProjectNameExists) {
      throw conflictException('Project name already exists');
    }

    if (!isClientExists) {
      throw badRequestException('Client not found');
    }

    if (!isProjectLeaderExists) {
      throw badRequestException('Project Leader not found');
    }

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

  async edit(editProjectDto: EditProjectDto, id: string) {
    const { projectName, clientId, projectLeader, teamId, Stakeholders } = editProjectDto;

    const [
      isProjectNameExists,
      isClientExists,
      isProjectLeaderExists,
      isTeamExists,
      isStakeHoldersExists,
    ] = await Promise.all([
      projectName ? this.projectModel.exists({ projectName }).lean() : true,
      clientId ? this.userModel.findById(clientId).lean() : null,
      projectLeader ? this.userModel.findById(projectLeader).lean() : null,
      teamId?.length > 0 ? this.teamModel.find({ _id: { $in: teamId } }, '_id').lean() : [],
      Stakeholders?.length > 0
        ? this.userModel.find({ _id: { $in: Stakeholders } }, '_id').lean()
        : [],
    ]);

    if (projectName && isProjectNameExists) {
      throw conflictException('Project name already exists');
    }

    if (clientId && !isClientExists) {
      throw badRequestException('Client not found');
    }

    if (projectLeader && !isProjectLeaderExists) {
      throw badRequestException('Project Leader not found');
    }

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

    const project = await this.projectModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!project) {
      throw notFoundException('Project not found');
    }

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
      'clientId projectLeader teamId Stakeholders',
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
