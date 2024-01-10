import React from "react";
import Layout from "../src/components/fronted/layout/layout";
import LoginForm from "../src/components/fronted/register/login-form";

const Login = () => {
  return (
    <Layout>
      <section className="bg-themeWhiteLight ">
        <div className="container mx-auto py-32">
          <LoginForm />
        </div>
      </section>
    </Layout>
  );
};

export default Login;
