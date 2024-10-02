import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Container, Link } from "@mui/material";

export default function AccordionFaq() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Container maxWidth="md">
        <Accordion
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            expanded
              ? {
                  "& .MuiAccordion-region": {
                    height: "auto",
                  },
                  "& .MuiAccordionDetails-root": {
                    display: "block",
                  },
                }
              : {
                  "& .MuiAccordion-region": {
                    height: 0,
                  },
                  "& .MuiAccordionDetails-root": {
                    display: "none",
                  },
                },
          ]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Как получать партнерскую выплату?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Вы можете получить рефереальную выплату, если по вашей{" "}
              <Link href="/referal/">партнерской ссылке</Link> зарегистрируется
              пользователь. И тогда с каждого пополнения баланса вашего
              реферала, вы <strong>будете получать 15%</strong> от суммы его
              пополения. Вы получите об этом оповещение и ваш баланс пополнится.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              Как получить бонус за рекомендацию или репост в соц.сети?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Здесь вам придется подождать сутки. Нужно чтобы репост провисел на
              стене более 24 часов. После этого пришлите нам ссылку на пост на
              адрес <Link href="mailto:app@ptahini.ru">app@ptahini.ru</Link> с
              указанием вашего логина. Мы начислим вам 50 баллов от
              администрации.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography>Как можно получить баллы бесплатно?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Баллы можно получить бесплатно разными способами. Например вам
              каждый день начисляются 3 балла. Самый лучший способ - это участие
              в реферальной программе, вы будете получать 15% от суммы
              пополнений вашего реферала.
            </Typography>
            <Typography gutterBottom>
              <table>
                <tbody>
                  <tr>
                    <td>3 балла</td>
                    <td>Ежедневный 9:00 МСК</td>
                  </tr>
                  <tr>
                    <td>100 баллов</td>
                    <td>
                      за <Link href="/login/">регистрацию</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>50 баллов</td>
                    <td>за рекомендацию</td>
                  </tr>
                  <tr>
                    <td>50 баллов</td>
                    <td>за репост</td>
                  </tr>
                  <tr>
                    <td>15% от платежа</td>
                    <td>
                      <Link href="/referal/">реферальная PRO</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}
