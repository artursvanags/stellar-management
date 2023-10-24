import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().nonempty('Email is required.').email(),
  password: z.string().nonempty('Password cannot be empty.').min(6, { message: 'Password is too short. It should be atleast 6 characters.' }),
})


export const userRegisterSchema = z.object({
  email: z.string().nonempty('Email is required.').email(),
  password: z.string().nonempty('Password cannot be empty.').min(6, { message: 'Password is too short. It should be atleast 6 characters.' }),
  confirmPassword: z.string().nonempty('Password cannot be empty.').min(6, { message: 'Confirmation password is too short. It should be atleast 6 characters.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords need to match!',
  path: ['confirmPassword'],
})