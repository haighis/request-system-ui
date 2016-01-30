'use strict';

angular.module('incidentSystemApp')
  .constant('CONSTANTS', {
    REQUEST_STATUS: {
      OPEN: {
        val: 'open',
        label: 'Open',
      },
      RESOLVED: {
        val: 'resolved',
        label: 'Resolved',
      },
      IN_PROGRESS: {
        val: 'inprogress',
        label: 'In Progress',
      }
    },
    DEFAULT_ROLES: {
      TENANT_USER: 'TENANT_USER',
      TENANT_MANAGER: 'TENANT_MANAGER',
      SYSTEM_MANAGER: 'SYSTEM_MANAGER'
    },
    DEFAULT_PERMISSIONS: {
      SYSTEM_MANAGER: 'System Settings,Tenant Settings,Add Request,Update Request,Delete Request,Dashboard',
      TENANT_MANAGER: 'Tenant Settings,Add Request,Update Request,Delete Request,Send Enroll Codes,Dashboard',
      TENANT_USER: 'Add Request,Update Request,Close Request,Dashboard'
    },
    GENERIC_TYPE_TAG: {
      REQUEST_TYPE: 'request_type',
      MODE: 'mode',
      URGENCY: 'urgency',
      PRIORITY: 'priority',
      CATEGORY: 'category',
      IMPACT: 'impact',
      DEPARTMENT: 'department'
    },
  });