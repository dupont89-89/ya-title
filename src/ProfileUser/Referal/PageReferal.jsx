import React from "react";
import Referal from "./Referal";
import { Box, Container, Typography } from "@mui/material";

export default function PageReferal(props) {
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography gutterBottom component="h1" variant="h3">
          Реферальная программа
        </Typography>
        <Typography gutterBottom variant="h6" component="p">
          Получайте 15% на баланс бонусом , от платежей ваших рефералов.
        </Typography>
      </Box>
      <Box>
        <Typography gutterBottom variant="body1" component="p">
          Привлекайте пользователей размещаю ссылку в соц.сетях, на форумах или
          в личных сообщениях своим друзьям. Когда пользователь перейдет по
          вашей ссылке и пройдет регистрацию он станет вашим рефералом.
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Мы предусмотрели, что пользователь может зарегистрироваться не сразу ,
          а через какое то время. Поэтому если пользователь просто ознакомится с
          сервисом Ptahini, но пройдет регистрацию потом, через некоторое время
          и даже не по вашей ссылке, он все равно станет вашим рефералом.
        </Typography>
      </Box>
      <Referal
        moneyPresentReferal={props.moneyPresentReferal}
        userId={props.userId}
        referal={props.referal}
      />
    </Container>
  );
}
