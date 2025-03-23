import prisma from "../db/db.config.js";

// fetch user

export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany({});
    return res.json({
        status: 200,
        data: users,
        message: "user fetched sucessfully",
    });
};

// fetch single user

export const showUser = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId),
        },
    });

    return res.json({
        status: 200,
        data: user,
        message: "user fetched sucessfully!",
    });
};

// create user

export const createUser = async (req, res) => {
    const { email, name, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser) {
        return res.json({ status: 400, message: "Email already exists!" });
    }

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: password,
        },
    });

    return res.json({
        status: 200,
        data: newUser,
        message: "user created sucessfully!",
    });
};

// update user

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, name, password } = req.body;

    const newUser = await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            email,
            name,
            password,
        },
    });

    res.json({
        status: 200,
        data: newUser,
        message: "User Updated Sucessfully!",
    });
};

// delete user

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    await prisma.user.delete({
        where: {
            id: Number(userId),
        },
    });
    res.json({
        status: 200,
        message: "User Deleted Sucessfully!",
    });
};
