export const ERROR_RES_SCHEMA = {
  statusCode: { type: 'integer', format: 'int32' },
  error: { type: 'string' },
  message: { type: 'string' },
};

export const API_OK_RESPONSE = {
  description: 'succeeded - The request was validated and succeeded',
  schema: {
    type: 'object',
    properties: ERROR_RES_SCHEMA,
    example: {
      code: 200,
      type: 'Success',
      message: 'get request was validated and succeeded.',
    },
  },
};

export const API_INTERNAL_SERVER_ERROR_RESPONSE = {
  description: 'Internal server error - unexpected error',
  schema: {
    type: 'object',
    properties: ERROR_RES_SCHEMA,
    example: {
      code: 500,
      error: 'Internal server error',
      message: 'Unexpected processing termination. Please try later, if persist contact FirstNet support team',
    },
  },
};

export const API_BAD_REQUEST_ERROR_RESPONSE = {
  description: 'Bad Request - Error in data.',
  schema: {
    type: 'object',
    properties: ERROR_RES_SCHEMA,
    example: {
      statusCode: 400,
      message: 'Validation failed',
      error: 'Bad Request',
    },
  },
};

export const API_UNAUTHORIZED_ERROR_RESPONSE = {
  description: 'The request requires user authentication',
  schema: {
    type: 'object',
    properties: ERROR_RES_SCHEMA,
    example: {
      code: 401,
      type: 'Unauthorized',
      message: 'User is not authorized',
    },
  },
};

export const API_FORBIDDEN_ERROR_RESPONSE = {
  description: 'The request requires user permission',
  schema: {
    type: 'object',
    properties: ERROR_RES_SCHEMA,
    example: {
      code: 403,
      type: 'Forbidden',
      message: 'Actino not allowed',
    },
  },
};
