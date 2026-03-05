'use client';

import * as React from 'react';

type ReactWithInternals = typeof React & {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: Record<string, unknown>;
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: Record<string, unknown>;
};

const reactWithInternals = React as ReactWithInternals;
const clientInternalsKey = '__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE';
const legacyInternalsKey = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

const existingClientInternals = reactWithInternals[clientInternalsKey];
if (existingClientInternals && typeof existingClientInternals === 'object') {
  if (!('S' in existingClientInternals)) {
    (existingClientInternals as { S: null }).S = null;
  }
} else {
  const legacyInternals = reactWithInternals[legacyInternalsKey];
  const normalizedInternals = {
    ...(legacyInternals && typeof legacyInternals === 'object' ? legacyInternals : {}),
    S: null,
  };

  try {
    Object.defineProperty(reactWithInternals, clientInternalsKey, {
      value: normalizedInternals,
      writable: true,
      configurable: true,
    });
  } catch {
    reactWithInternals[clientInternalsKey] = normalizedInternals;
  }
}
