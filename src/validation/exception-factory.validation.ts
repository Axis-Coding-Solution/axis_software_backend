import { badRequestException } from '@/utils';

const responseValidation = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  //* custom response for better frontend integration
  exceptionFactory: (errors: any) => {
    const result = errors.map((error: any) => ({
      property: error.property,
      message: error.constraints?.[Object.keys(error.constraints)[0]],
    }));
    throw badRequestException(result.map((r: any) => `${r.message}`).join(', '));
  },
};

export default responseValidation;
