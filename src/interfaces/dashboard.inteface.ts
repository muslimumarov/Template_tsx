interface IMapUzbekistan {
    d: string;
    stroke: string;
    strokeWidth: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    title: string;
    id: string | number;
}

interface ObjectStat {
    total_objects: number;
    used_objects: number;
}

interface AppealStat {
    new: number;
    in_progress: number;
    returned: number;
    approved: number;
    rejected: number;
}

interface ApplicationStat {
    new: number;
    in_mof: number;
    negotiated: number;
    returned: number;
    approved: number;
    rejected: number;
}

interface IProject {
    id: number;
    project_name: string;
    region: string | null;
    from_date: number;
    to_date: number;
    cost: string;
}


interface Statistics {
    object_stat: ObjectStat;
    appeal_stat: AppealStat;
    application_stat: ApplicationStat;
    top_five_projects: IProject;
}


export type {
    IMapUzbekistan,
    Statistics,
    IProject
}