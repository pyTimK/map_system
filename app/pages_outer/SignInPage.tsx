import SizedBox from "@/components/SizedBox";
import BackIcon from "@/components/svg/icon/BackIcon";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { interFont, jsoFont } from "@/styles/fonts";
import { useContext } from "react";
import { PagesWrapperContext } from "../pages/PagesWrapper";
import BackPage from "@/components/custom/BackPage";

const SignInPage: React.FC = () => {
  const {
    type,
    emailRef,
    passwordRef,
    errorEmailInput,
    setErrorEmailInput,
    errorPasswordInput,
    setErrorPasswordInput,
    toggleType,
    login,
    signup,
    forgotPassword,
  } = useSignInPage();
  const { setShowSignIn } = useContext(PagesWrapperContext);

  return (
    <div>
      <div
        className={`flex flex-col items-ceter justify-center space-y-8 px-10`}
      >
        <SizedBox height={20} />
        <div className="m-auto w-full">
          {/* <FullLogo /> */}
          <p className={`${jsoFont} text-5xl text-center text-darker_primary`}>
            <br />
            Admin
          </p>
        </div>
        <form
          className="flex flex-col justify-center space-y-10"
          onSubmit={type === SignInType.signIn ? login : signup}
        >
          <MyInput
            placeholder="Email"
            error={errorEmailInput}
            innerRef={emailRef}
            onChange={() => setErrorEmailInput(false)}
          />
          <MyInput
            placeholder="Password"
            type="password"
            error={errorPasswordInput}
            innerRef={passwordRef}
            onChange={() => setErrorPasswordInput(false)}
          />
          <MyButton
            type="submit"
            label={type === SignInType.signIn ? "LOGIN" : "SIGN UP"}
          />
        </form>
      </div>
      <BackPage onClick={() => setShowSignIn(false)}></BackPage>
    </div>
  );
};

export default SignInPage;
