// import { UserModel } from '@/database/models';
// import { NotFoundError, UnauthorizedError } from '@/errors';

// interface IRequest {
//   email: string;
//   password: string;
// }

// interface IResponse {
//   user: UserModel;
//   token: string;
// }

// class Login {
//   public async run({ email, password }: IRequest): Promise<IResponse> {
//     const rowUser = await UserModel.findOne({
//       where: { email: email.toLowerCase() },
//     });

//     if (!rowUser) {
//       throw new NotFoundError({ message: 'User not found.' });
//     }

//     if (!(await rowUser.verifyPassword(password))) {
//       throw new UnauthorizedError({
//         message: 'User or password is not valid.',
//       });
//     }

//     const token = await rowUser.generateJwtToken();
//     rowUser.setDataValue<any>('password', undefined);

//     return { user: rowUser, token };
//   }
// }

// const authLoginService = new Login();
// export default authLoginService;
