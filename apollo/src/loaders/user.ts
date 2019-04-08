export const fetchUser = async (key, models) => {
    const user = await models.User.findOne({
        where: {
            id: {
                $in: key,
            },
        },
    })
    console.log(user)
    return user
}
