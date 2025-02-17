// import { Request, Response } from 'express';
// import * as Yup from 'yup';

// import authLoginService from '@/modules/auth/services/login';

// class Login {
//   public async handle(request: Request, response: Response): Promise<Response> {
//     await Yup.object()
//       .shape({
//         email: Yup.string().required().email(),
//         password: Yup.string().required(),
//       })
//       .validate(request.body);
//     const { token } = await authLoginService.run(request.body);

//     return response.json({ token });
//   }
// }

// const authLoginController = new Login();
// export default authLoginController;
