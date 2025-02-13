export enum RateType {
  hourly = 'hourly',
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
  fixed = 'fixed',
}

export enum Priority {
  high = 'high',
  medium = 'medium',
  low = 'low',
}

export enum ProjectStatus {
  started = 'started',
  inProgress = 'inProgress',
  cancelled = 'cancelled',
  completed = 'completed',
  onHold = 'onHold',
}

export enum communicationChannels {
  email = 'email',
  call = 'call',
  skype = 'skype',
  slack = 'slack',
  zoom = 'zoom',
  microsoftTeams = 'microsoftTeams',
  googleMeet = 'googleMeet',
  others = 'others',
}

export enum ProjectType {
  frontend = 'frontend',
  backend = 'backend',
  fullstack = 'fullstack',
  qa = 'qa',
  ai = 'ai',
  devops = 'devops',
  desktop = 'desktop',
  others = 'others',
}
