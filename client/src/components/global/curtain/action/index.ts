export const curtainAction = (status: string, action: string) => {
    return {
        type: status,
        action,
    }
}
