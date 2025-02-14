import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Project, PROJECT_MODEL } from 'src/schemas/project';

@Schema({ timestamps: true })
export class Timesheet {
  @Prop({ type: [Types.ObjectId], ref: PROJECT_MODEL, required: true })
  projectId: String[] | Types.ObjectId[] | Project[];
}
