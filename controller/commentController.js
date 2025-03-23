// create comment

import prisma from "../db/db.config.js";

export const createComment = async (req, res) => {

    const {user_id, post_id, comment} = req.body;

    const createUserComment = await prisma.comment.create({
        data:{
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment
        }
    })
    return res.json({
        status:200,
        data:createUserComment,
        message:"Comment created sucessfully!"
    })

}

// fetch all comment

export const fetchAllComments = async (req, res) => {
    const getComments = await prisma.comment.findMany({})

    return res.json({status:200, data:getComments, message:"Fetched all comments sucessfully!"})
}

// fetch single comment 

export const fetchSingleComment = async (req, res) => {
    const commentId = req.params.id;
    const singleComment = await prisma.comment.findFirst({
        where:{
            id: Number(commentId)
        }
    })
    return res.json({
        status:200,
        data:singleComment,
        message:'Comment fetched sucessfully!'
    })


}