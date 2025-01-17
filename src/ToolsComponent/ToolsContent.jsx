import React from "react";
import ApiSendYaSearchContainer from "../api-ya-search/ApiSendYaSearchContainer";
import TextBottom from "./TextBottom";
import CommerceKeyToolsContainer from "../CommerceKeyTools/CommerceKeyToolsContainer";
import CountWordKeyContainer from "../countWordkey/CountWordKeyContainer";
import { Typography } from "@mui/material";
import WhoisToolsContainer from "../Whois/WhoisToolsContainer";
import { useParams } from "react-router-dom";
import ToolsPageTabs from "./PartsComponentTools/ToolsPageTabs";
import ToolsPageVideo from "./PartsComponentTools/ToolsPageVideo";
import YaIksContainer from "../YaIks/YaIksContainer";
import DomenDeleteContainer from "../DomenDelete/DomenDeleteContainer";

export default function ToolsContent(props) {
  const params = useParams();

  // Получаем pathname из пропсов или из параметров URL
  const pathname = props.pathname || `/app/${params.tools}/`;

  const getTextForPage = (pathname) => {
    switch (pathname) {
      case "/app/seo-title/":
        return (
          <Typography fontSize={15} component="div">
            <p>
              Ptahini создал инновационный инструмент для генерации "
              <b>правильного тайтла</b>", специально разработанный для
              SEO-специалистов и контент-маркетологов, чтобы автоматизировать
              процесс создания заголовков Title на основе актуальных данных
              поисковой выдачи. Этот инструмент помогает подобрать наиболее
              релевантные и тематически близкие LSI (Latent Semantic Indexing)
              слова и фразы, что обеспечивает более точное соответствие
              заголовков запросам пользователей.
            </p>
            <h2>Преимущества использования инструмента:</h2>
            <ol>
              <li>
                <p>
                  <strong>Повышение релевантности</strong>. Благодаря анализу
                  LSI-слов, инструмент формирует заголовки, которые не только
                  описывают содержание страницы, но и учитывают скрытые
                  тематические связи. Это помогает увеличить шансы на попадание
                  страницы в топ поисковой выдачи.
                </p>
              </li>
              <li>
                <p>
                  <strong>Увеличение CTR</strong>. Заголовки, составленные с
                  учетом ключевых фраз и связанных терминов, становятся более
                  привлекательными для пользователей, что ведет к росту
                  показателя кликабельности (CTR). Чем более заголовок
                  соответствует запросам, тем выше вероятность, что пользователь
                  кликнет на него.
                </p>
              </li>
              <li>
                <p>
                  <strong>Экономия времени и ресурсов</strong>. Для
                  SEO-специалистов и контент-менеджеров автоматизация подбора
                  заголовков упрощает рабочий процесс. Вместо ручного анализа
                  поисковой выдачи и составления заголовков, они могут
                  сэкономить время и сосредоточиться на других задачах.
                </p>
              </li>
              <li>
                <p>
                  <strong>Адаптация под изменяющиеся алгоритмы</strong>. С
                  учётом регулярных изменений в алгоритмах поисковых систем,
                  этот инструмент предлагает актуальные и гибкие решения для
                  оптимизации заголовков, подстраиваясь под текущие тенденции и
                  улучшая видимость контента.
                </p>
              </li>
            </ol>
            <h2>Кому будет полезен инструмент:</h2>
            <ul>
              <li>
                <p>
                  <strong>SEO-специалистам</strong>. Они могут быстро создавать
                  заголовки, которые не только привлекают внимание
                  пользователей, но и соответствуют требованиям поисковых
                  систем.
                </p>
              </li>
              <li>
                <p>
                  <strong>Контент-менеджерам</strong>. Инструмент помогает
                  формировать качественные заголовки, делая контент более
                  видимым и привлекательным.
                </p>
              </li>
              <li>
                <p>
                  <strong>Малому и среднему бизнесу</strong>. Для компаний,
                  которые не располагают большим бюджетом на SEO, автоматизация
                  создания заголовков станет выгодным решением, позволяя
                  улучшить позиционирование сайта без значительных затрат.
                </p>
              </li>
              <li>
                <p>
                  <strong>Агентствам цифрового маркетинга</strong>. Возможность
                  автоматического создания "правильных тайтлов" оптимизирует
                  процессы, помогает повысить производительность и улучшить
                  результаты кампаний для клиентов.
                </p>
              </li>
            </ul>
            <h3>Этот инструмент станет верным помощником</h3>
            <p>
              Инструмент от Ptahini &mdash; это мощное средство, которое не
              только упрощает процесс SEO, но и помогает создавать заголовки,
              которые работают на достижение конкретных бизнес-целей. С его
              помощью специалисты могут более эффективно управлять видимостью и
              привлекательностью контента в поисковой выдаче, что приводит к
              увеличению трафика и укреплению позиций сайта в поисковых
              системах.
            </p>
          </Typography>
        );
      case "/app/wordstat/":
        return (
          <Typography fontSize={15} component="div">
            <h2>
              Ptahini &ndash; Ваш незаменимый помощник в мире SEO и маркетинга
            </h2>
            <h3>Что такое Ptahini Key Count?</h3>
            <p>
              <strong>Ptahini Key Count</strong> &ndash; это мощный и удобный
              инструмент для сбора частотности поисковых запросов, разработанный
              специально для SEO специалистов, специалистов по рекламе и
              бизнесменов. Наш инструмент помогает определить, какие ключевые
              запросы наиболее популярны среди пользователей поисковых систем,
              что позволяет эффективно планировать и реализовывать маркетинговые
              стратегии.
            </p>
            <h3>Зачем использовать Ptahini?</h3>
            <p>Использование Ptahini приносит ряд ощутимых преимуществ:</p>
            <ol>
              <li>
                <strong>Повышение видимости в поисковых системах</strong>:
                Знание популярных ключевых запросов помогает оптимизировать
                контент и рекламные кампании, что приводит к улучшению позиций в
                поисковой выдаче.
              </li>
              <li>
                <strong>Экономия времени и ресурсов</strong>: Ptahini
                автоматизирует процесс сбора данных, позволяя быстро получить
                точные и актуальные сведения о частотности запросов.
              </li>
              <li>
                <strong>Повышение эффективности рекламы</strong>: Понимание
                потребностей и интересов аудитории позволяет создавать более
                целевые и эффективные рекламные кампании.
              </li>
              <li>
                <strong>Улучшение пользовательского опыта</strong>: Адаптация
                контента под популярные запросы улучшает пользовательский опыт,
                увеличивая вероятность конверсии.
              </li>
            </ol>
            <h3>Как работает Ptahini?</h3>
            <p>
              Ptahini использует передовые алгоритмы и технологии для сбора и
              анализа данных из различных поисковых систем. Вот основные шаги
              работы с нашим инструментом:
            </p>
            <ol>
              <li>
                <strong>Ввод ключевых запросов</strong>: Пользователь вводит
                интересующие его ключевые запросы в интерфейс Ptahini.
              </li>
              <li>
                <strong>Анализ и сбор данных</strong>: Инструмент собирает
                данные о частотности запросов, анализируя их популярность и
                конкурентоспособность.
              </li>
              <li>
                <strong>Отчет и рекомендации</strong>: Ptahini генерирует
                подробный отчет, содержащий информацию о частотности запросов,
                трендах и рекомендуемых стратегиях.
              </li>
            </ol>
            <h3>Особенности и преимущества Ptahini</h3>
            <ul>
              <li>
                <strong>Интуитивно понятный интерфейс</strong>: Наш инструмент
                легко использовать даже тем, кто не обладает глубокими знаниями
                в области SEO и маркетинга.
              </li>
              <li>
                <strong>Актуальные данные</strong>: Ptahini регулярно обновляет
                данные, чтобы предоставить вам наиболее точную и актуальную
                информацию.
              </li>
              <li>
                <strong>Гибкость и адаптивность</strong>: Инструмент подходит
                для работы с любыми типами бизнеса и масштабами рекламных
                кампаний.
              </li>
              <li>
                <strong>Поддержка пользователей</strong>: Наша команда поддержки
                всегда готова помочь вам с любыми вопросами и предложениями.
              </li>
            </ul>
            <h3>Начните с Ptahini уже сегодня!</h3>
            <p>
              Присоединяйтесь к числу успешных пользователей Ptahini и начните
              оптимизировать свой бизнес прямо сейчас. Наш инструмент поможет
              вам лучше понять своих клиентов, повысить эффективность
              маркетинговых кампаний и достигнуть новых высот.
            </p>
          </Typography>
        );
      case "/app/commerce-key/":
        return (
          <Typography fontSize={15} component="div">
            <h2>Какие бывают типы запросов</h2>
            <ul>
              <li>
                Общие запросы - это запросы с нечетким и неясным смыслом, когда
                непонятно, что конкретно пользователь имел ввиду, к примеру,
                «рецепт».
              </li>
              <li>
                Транзакционные - они же целевые, коммерческие, основные запросы,
                по которым продвигается бизнес. Обычно они явно указывают на
                транзакцию: купить, заказать, цена. Пользователи, которые ищут
                информацию по подобным словам, собираются приобрести товары и
                услуги прямо сейчас или в недалеком будущем. Это самые важные
                слова для продвижения;
              </li>
              <li>
                Информационные - запросы типа: как, где, почему, зачем, и т.д.
                обычно добавляются на страницы статей/блога,
              </li>
              <li>
                Навигационные - с привязкой к геолокации, обычно добавляются на
                тематические страницы: контакты, доставка, самовывоз, о
                компании.
              </li>
              <li>Геозависимые и геонезависимые.</li>
              <li>Брендовые - запросы с упоминанием бренда компании</li>
            </ul>
            <h2>Информационный запрос или коммерческий?</h2>
            <p>
              Определение типа запроса для успешной SEO-стратегии. Важно
              понимать намерение пользователя (user intent) и соответствующим
              образом оптимизировать контент. Различение между информационными и
              коммерческими запросами и соответствующая оптимизация контента
              может значительно улучшить ваши маркетинговые и SEO-стратегии,
              привлечь больше трафика и повысить конверсии.
            </p>
            <p>
              Используйте инструмент Ptahini для определения информационный
              запрос или коммерческие (транзакционный). После определения типа
              запроса, у вас будет понимание, писать статью (блог, отдельная
              страница со статьей итд) или продвигать нужно на страницы продаж
              (категория товара, страница услуги итд).
            </p>
            <p>
              Для удобства мы предлагаем воспользоваться массовой проверкой
              запросов на коммерциализацию. Загрузите списком или файлом ваши
              запросы.
            </p>
          </Typography>
        );
      case "/app/whois/":
        return (
          <Typography fontSize={15} component="div">
            <h2>
              Проверить домен на доступность, а если занят подпишись на
              освобождение
            </h2>
            <p>
              <strong>
                Планируете создать сайт и ищете уникальное доменное имя?
              </strong>{" "}
              Наш инструмент для проверки доменов поможет вам узнать, свободен
              ли интересующий вас домен, или он уже занят. С помощью сервиса
              Whois вы можете моментально получить информацию о любом домене.
            </p>
            <h3>Что предлагает наш инструмент:</h3>
            <ul>
              <li>
                <strong>Проверка домена на занятость.</strong> Узнайте, доступен
                ли ваш выбранный домен для регистрации.
              </li>
              <li>
                <strong>Информация о текущем владельце.</strong> Если домен
                занят, вы сможете увидеть данные о владельце и дату окончания
                регистрации.
              </li>
              <li>
                <strong>Подписка на освобождение домена.</strong> Не хотите
                упустить идеальное доменное имя? Если домен занят, подпишитесь
                на уведомления, и мы сообщим вам на email, когда он освободится
                и станет доступным для регистрации.
              </li>
            </ul>
            <p>
              Наш сервис предоставляет простой и удобный способ контролировать
              ситуацию с доменами и своевременно реагировать на их освобождение.
              Начните проверку доменного имени прямо сейчас!
            </p>
          </Typography>
        );
      case "/app/yandex-iks/":
        return (
          <Typography fontSize={15} component="div">
            <h2>Массовая проверка Индекса Качества Сайта Яндекса</h2>
            <p>Удобный сервис проверки</p>
          </Typography>
        );
      case "/app/del-list/":
        return (
          <Typography fontSize={15} component="div">
            <h2>Найди качественный особождающийся сегодня домен</h2>
            <p>Отправляй заявку на регистрацию.</p>
          </Typography>
        );
      case "default":
      default:
        return null;
    }
  };

  const getToolsPage = (pathname) => {
    switch (pathname) {
      case "/app/seo-title/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<ApiSendYaSearchContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239050&hd=2"
                title="Видео создания Title"
              />
            }
          />
        );
      case "/app/commerce-key/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<CommerceKeyToolsContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239051&hd=2"
                title="Видео определение типа ключевого запроса"
              />
            }
          />
        );
      case "/app/wordstat/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<CountWordKeyContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239051&hd=2"
                title="Видео определение частотность запросов"
              />
            }
          />
        );
      case "/app/whois/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<WhoisToolsContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239051&hd=2"
                title="Видео подписки на домен"
              />
            }
          />
        );
      case "/app/yandex-iks/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<YaIksContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239051&hd=2"
                title="Видео проверки ИКС сайта"
              />
            }
          />
        );
      case "/app/del-list/":
        return (
          <ToolsPageTabs
            description={<TextBottom text={getTextForPage(pathname)} />}
            app={<DomenDeleteContainer />}
            video={
              <ToolsPageVideo
                src="https://vkvideo.ru/video_ext.php?oid=-113757074&id=456239051&hd=2"
                title="Видео покупки освобождающихся доменов"
              />
            }
          />
        );
      default:
        return null;
    }
  };

  return <>{getToolsPage(pathname)}</>;
}
