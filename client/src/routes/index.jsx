export const ROUTES = {
    EDUCATIONAL: {
        HOME: {
          PATH: '/'
        },
        ABOUT: {
          PATH: '/about'
        },
        CONTACT: {
          PATH: '/contact'
        },
        ALUMNI: {
          PATH: '/alumni'
        },
        COURSES: {
          MAIN: {
            PATH: '/courses'
          },
          DETAILS: {
            PATH: '/courses/:id'
          }
        },
        BLOGS: {
          MAIN: {
            PATH: '/blogs'
          },
          DETAILS: {
            PATH: '/blogs/:id'
          }
        },
        EVENTS: {
          MAIN: {
            PATH: '/events'
          },
          DETAILS: {
            PATH: '/events/:id'
          }
        },
        VACANCY: {
          DETAILS: {
            PATH: '/vacancy/:id'
          }
        },
    },
    CORPORATE: {
        HOME: {
          PATH: '/corporate'
        },
        CONTACT: {
          PATH: '/corporate/contact'
        },
    }
};
  

export const ADMIN_ROUTES = {
  HOME: {
    PATH: '/admin'
  },

  MAIN: {
    HOME: {
      PATH: '/admin/home'
    },
    EDIT: {
      PATH: '/admin/home/form/:id'
    }
  },
  
  LOGIN: {
    PATH: '/admin/login'
  },

  ABOUT: {
    MAIN: {
      PATH: '/admin/about'
    },
    EDIT_ABOUT: {
      PATH: '/admin/about/form/:id'
    }
  },

  EVENTS: {
    MAIN: {
      PATH: '/admin/events'
    },
    NEW_EVENT: {
      PATH: '/admin/events/form'
    },
    EDIT_EVENT: {
      PATH: '/admin/events/form/:id'
    }
  },

  ADVANTAGES: {
    MAIN: {
      PATH: '/admin/advantages'
    },
    NEW_ADVANTAGE: {
      PATH: '/admin/advantages/form'
    },
    EDIT_ADVANTAGE: {
      PATH: '/admin/advantages/form/:id'
    }
  },

  USERS: {
    MAIN: {
      PATH: '/admin/users'
    },
    NEW_USER: {
      PATH: '/admin/users/new'
    }
  },

  COURSES: {
    MAIN: {
      PATH: '/admin/courses'
    },
    NEW_COURSE: {
      PATH: '/admin/courses/form'
    },
    EDIT_COURSE: {
      PATH: '/admin/courses/form/:id'
    }
  },

  SUBJECTS: {
    MAIN: {
      PATH: '/admin/subjects'
    },
    NEW_SUBJECT: {
      PATH: '/admin/subjects/form'
    },
    EDIT_SUBJECT: {
      PATH: '/admin/subjects/form/:id'
    }
  },

  PLANS: {
    MAIN: {
      PATH: '/admin/plans'
    },
    NEW_PLAN: {
      PATH: '/admin/plans/form'
    },
    EDIT_PLAN: {
      PATH: '/admin/plans/form/:id'
    }
  },

  APPLIES: {
    ACADEMIC: {
      PATH: '/admin/apply/academic'
    },
    CORPORATE: {
      PATH: '/admin/apply/corporate'
    }
  },

  CATEGORIES: {
    MAIN: {
      PATH: '/admin/categories'
    },
    NEW_CATEGORY: {
      PATH: '/admin/categories/form'
    },
    EDIT_CATEGORY: {
      PATH: '/admin/categories/form/:id'
    }
  },

  VACANCIES: {
    MAIN: {
      PATH: '/admin/vacancies'
    },
    NEW_VACANCY: {
      PATH: '/admin/vacancies/form'
    },
    EDIT_VACANCY: {
      PATH: '/admin/vacancies/form/:id'
    }
  },

  BLOGS: {
    MAIN: {
      PATH: '/admin/blogs'
    },
    NEW_BLOG: {
      PATH: '/admin/blogs/form'
    },
    EDIT_BLOG: {
      PATH: '/admin/blogs/form/:id'
    }
  },

  TEACHERS: {
    MAIN: {
      PATH: '/admin/teachers'
    },
    NEW_TEACHER: {
      PATH: '/admin/teachers/form'
    },
    EDIT_TEACHER: {
      PATH: '/admin/teachers/form/:id'
    }
  },

  SERVICES: {
    MAIN: {
      PATH: '/admin/services'
    },
    NEW_SERVICE: {
      PATH: '/admin/services/form'
    },
    EDIT_SERVICE: {
      PATH: '/admin/services/form/:id'
    }
  },
};
