export interface ISessionData {
    _id?: string,
    name?: string,
    session_id?: string,
    embed_url?: string,
    creator?: string,
    users?: IAllowedUser[],
    isActive?: Boolean,
}

export interface IAllowedUser {
    email?: string,
}