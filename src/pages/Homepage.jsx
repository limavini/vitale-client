import React, { useState, useContext } from "react";
import styled from "styled-components";
import backgroundImage from "../assets/food.jpg";
import { Panel } from "../components/Panel";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/apple.svg";
import { UserContext } from "../UserContext";
import axios from "axios";

const BannerContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100vw;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
`;

const Content = styled.div`
  float: right;
  height: 100%;
  width: 60%;
`;

const TextContainer = styled.div`
  padding: 80px 60px 60px 60px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 72px;
  color: #ff206e;
  display: flex;
  padding-right: 10px;
`;

const Description = styled.p`
  margin: 0;
  padding: 0;
`;

const PanelContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  width: 350px;
  margin: auto;
`;

const PanelHeading = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  padding-top: 25px;
  display: block;
`;

const SignInText = styled(Link)`
  font-size: 12px;
  padding-top: 10px;
  display: block;
  text-decoration: none;
  color: inherit;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoContainer = styled.div`
  padding-top: 3px;
  padding-left: 10px;
`;

export const Homepage = props => {
  const { changeUser } = useContext(UserContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://vitale-server.herokuapp.com/auth/login",
        data: {
          ...user
        }
      });

      if (response.status === 200) {
        changeUser({ ...response.data });

        if (response.data.user.type === "Doctor") {
          history.push("/patients");
        } else {
          history.push(`/patients/${response.data.user._id}`);
        }
      }
    } catch ({ response }) {
      const {
        data: { message }
      } = response;
      alert(message);
    }
  };

  return (
    <BannerContainer imgUrl="../assets/food_max.jpg">
      <Content>
        <TextContainer>
          <Title>
            VITALE{" "}
            <LogoContainer>
              <Logo fill="#ff206e" height={57} width={57} />
            </LogoContainer>
          </Title>

          <Description>
            Crie dietas. Controle medidas. Seja saudável.
          </Description>
        </TextContainer>
        <PanelContainer>
          <Panel>
            <PanelHeading>ENTRE AGORA</PanelHeading>
            <form>
              <Input
                type="text"
                value={user.email}
                name="email"
                required
                onChange={handleChange}
                autoComplete="current-email"
                label="E-mail"
              />
              <Input
                type="password"
                value={user.password}
                name="password"
                required
                onChange={handleChange}
                autoComplete="current-password"
                label="Senha"
              />
              <SignInText to="/register">Ainda não tem uma conta?</SignInText>
              <ButtonContainer>
                <Button
                  background="#FF206E"
                  hover="#cc1a55"
                  type="button"
                  onClick={handleSubmit}
                >
                  Entrar
                </Button>
              </ButtonContainer>
            </form>
          </Panel>
        </PanelContainer>
      </Content>
    </BannerContainer>
  );
};
