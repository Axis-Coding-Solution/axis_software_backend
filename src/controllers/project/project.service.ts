import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from 'src/definitions/dtos/project/create/create-project.dto';
import { EditProjectDto } from 'src/definitions/dtos/project/edit/edit-project.dto';
import { FindUserInterface } from 'src/interfaces/user';
import { CLIENT_MODEL, ClientDocument } from 'src/schemas/client';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';
import { EMPLOYEE_MODEL, EmployeeDocument } from 'src/schemas/employees/employee';
import { PROJECT_MODEL, ProjectDocument } from 'src/schemas/project';
import {
  areDatesSame,
  areDatesValid,
  calculateBusinessHours,
  forbiddenException,
  isDateWeekend,
  notFoundException,
} from 'src/utils';
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

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { projectName, clientId, projectLeader, teamMembers, startDate, endDate } =
      createProjectDto;

    //* is start date a weekend
    isDateWeekend(startDate, PROJECT_MODEL);

    //* validate dates
    areDatesValid(startDate, endDate);
    areDatesSame(startDate, endDate);

    //* search ids in db
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

    //* calculate total hours btw startDate and endDate
    const totalHours = calculateBusinessHours(startDate, endDate);
    createProjectDto.totalHours = totalHours;
    createProjectDto.remainingHours = totalHours;

    const project = createHelper(createProjectDto, PROJECT_MODEL, this.projectModel);

    return project;
  }

  async edit(editProjectDto: EditProjectDto, id: Types.ObjectId) {
    const { projectName, clientId, projectLeader, teamMembers, startDate, endDate } =
      editProjectDto;

    //* is start date a weekend
    startDate ? isDateWeekend(startDate, PROJECT_MODEL) : null;

    //* validate dates
    startDate && endDate ? areDatesValid(startDate, endDate) : null;
    endDate && startDate ? areDatesSame(endDate, startDate) : null;

    //* search ids in db
    const [, , , teamMembersData] = await Promise.all([
      projectName ? await existsHelper(projectName, 'projectName', this.projectModel, id) : null,
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

    //* calculate total hours btw startDate and endDate
    if (startDate && endDate) {
      const totalHours = calculateBusinessHours(startDate, endDate);
      editProjectDto.totalHours = totalHours;
      editProjectDto.remainingHours = totalHours;
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

  async projectByRole(id: Types.ObjectId, role: string) {
    if (role === 'admin') {
      const { items } = await getAllHelper(null, null, this.projectModel, null, null);
      // return items.map((item) => item?.projectName);
      return items;
    }
    if (role === 'employee') {
      //* find current user
      const findCurrentUser = id
        ? await getSingleHelper<FindUserInterface>(id, USER_MODEL, this.userModel)
        : null;

      //* assign employee id
      const employeeId = findCurrentUser?.employeeId;

      if (!employeeId) throw notFoundException('Employee not found');

      const employeeIdStr = employeeId?.toString();
      const project = await this.projectModel.find({
        $or: [{ projectLeader: employeeIdStr }, { teamMembers: { $in: [employeeIdStr] } }],
      });
      if (project.length === 0) {
        throw notFoundException('Currently, you are not added to any project');
      }
      return project;
    } else {
      throw forbiddenException(`${role} is not eligible to access this resource`);
    }
  }
}
