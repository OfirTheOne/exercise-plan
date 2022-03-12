import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exception.filter';

const mockUrl = 'http://localhost:5000';
const mockJson = jest.fn();
const mockMethod = 'POST';

let exceptionFilter: AllExceptionsFilter;

const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));

const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn().mockImplementation(() => ({
    url: mockUrl,
    method: mockMethod,
  })),
}));

const mockDate = Date.now();
jest.spyOn(Date, 'now').mockReturnValue(mockDate);

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('All exception filter tests', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    exceptionFilter = new AllExceptionsFilter();
  });
  it('should be defined', () => {
    expect(exceptionFilter).toBeDefined();
  });

  describe('Http Exception', () => {
    it('400 Bad Request', () => {
      exceptionFilter.catch(new HttpException('400 Bad Request', HttpStatus.BAD_REQUEST), mockArgumentsHost);
      expectations(HttpStatus.BAD_REQUEST, '400 Bad Request', 400, HttpException.name);
    });

    it('401 Unauthorized', () => {
      exceptionFilter.catch(new HttpException('401 Unauthorized', HttpStatus.UNAUTHORIZED), mockArgumentsHost);
      expectations(HttpStatus.UNAUTHORIZED, '401 Unauthorized', 401, HttpException.name);
    });

    it('404 Not Found', () => {
      exceptionFilter.catch(new HttpException('404 Not Found', HttpStatus.NOT_FOUND), mockArgumentsHost);
      expectations(HttpStatus.NOT_FOUND, '404 Not Found', 404, HttpException.name);
    });

    it('403 Forbidden', () => {
      exceptionFilter.catch(new HttpException('403 Forbidden', HttpStatus.FORBIDDEN), mockArgumentsHost);
      expectations(HttpStatus.FORBIDDEN, '403 Forbidden', 403, HttpException.name);
    });
    it('406 Not Acceptable', () => {
      exceptionFilter.catch(new HttpException('406 Not Acceptable', HttpStatus.NOT_ACCEPTABLE), mockArgumentsHost);
      expectations(HttpStatus.NOT_ACCEPTABLE, '406 Not Acceptable', 406, HttpException.name);
    });
  });

  describe('Server Error', () => {
    it('500 InternalServerError', () => {
      exceptionFilter.catch(new InternalServerErrorException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR.toString()), mockArgumentsHost);
      expectations(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', 500, InternalServerErrorException.name);
    });

    it('503 Service Unavailable', () => {
      exceptionFilter.catch(new HttpException('503 Service Unavailable', HttpStatus.SERVICE_UNAVAILABLE), mockArgumentsHost);
      expectations(HttpStatus.SERVICE_UNAVAILABLE, '503 Service Unavailable', 503, HttpException.name);
    });

    it('simulate Error exception', () => {
      exceptionFilter.catch(new MockException({ error: 'Server Error' }), mockArgumentsHost);
      expectations(HttpStatus.INTERNAL_SERVER_ERROR, 'Server Error', 500, Error.name);
    });
  });
});

function expectations(httpStatus: HttpStatus, message: string, statusCode: number, errorType: string): void {
  expect(mockHttpArgumentsHost).toBeCalledTimes(1);
  expect(mockHttpArgumentsHost).toBeCalledWith();
  expect(mockGetResponse).toBeCalledTimes(1);
  expect(mockGetResponse).toBeCalledWith();
  expect(mockStatus).toBeCalledTimes(1);
  expect(mockStatus).toBeCalledWith(httpStatus);
  expect(mockJson).toBeCalledTimes(1);
  expect(mockJson).toBeCalledWith({
    errorMessage: message,
    errorType: errorType,
    path: mockUrl,
    statusCode: statusCode,
    timestamp: mockDate,
  });
}

export class MockException {
  private readonly message: unknown;
  constructor(message: unknown) {
    this.message = message;
  }
  getexception(): unknown {
    return this.message;
  }
}
