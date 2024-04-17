import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    const newUser = await UserService.call("user.createUser", {
      username: "nelson",
      email: "nelson@gmail.com",
    });
    console.log("New User Created:", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("All Users:", users);
    //simulate email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform!",
      content: "Thank you for signing up",
    });
    console.log(emailResult);
    // simulate auth
    const authResult = await AuthService.call("auth.authUser", {
      username: "admin",
      password: "password",
    });

    console.log("Auth result:", authResult);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
