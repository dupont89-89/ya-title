export function DictionaryModule(lang) {
  if (lang !== "ru") {
    return null;
  }

  function parseMorphemes(line) {
    // преобразует части слов в упорядоченный массив
    return line
      .toLowerCase()
      .replace(/ё/g, "е")
      .replace(/^[^а-я]+/, "")
      .replace(/[^а-я]+$/, "")
      .split(/[^а-я]+/)
      .filter(function (value) {
        return value;
      })
      .sort(function (a, b) {
        return a.length - b.length;
      });
  }

  const dict = {
    exceptions: [
      "из",
      "за",
      "на",
      "не",
      "ни",
      "во",
      "по",
      "со",
      "бы",
      "об",
      "ли",
      "же",
      "да",
      "до",
      "от",
      "для",
      "под",
      "над",
      "гг",
      "вс",
    ],
    immutableRoots:
      "однако, вместе, вообще, иначе, назад, никто, перед, пока, ради, ведь, если, там, так, как, кто, что, раз, вне, при, ли, им",
    unbreakableRoots: parseMorphemes(
      "ази, будн, " +
        "ваш, век, вер, вес, вид, вод, вред, вечер, власт, вопрос, войн, втор, ведомств, " +
        "восто, возраж, восстанов, верн, ворот, вним, газон, " +
        "дел, дан, дач, дат, доход, доступ, доклад, достав, долж, достат, " +
        "закон, заслон, запад, задач, заяв, зыв, " +
        "июн, июл, истор, име, иде, извест, информ, " +
        "крат, крыл, лин, лет, лом, " +
        "мыш, мир, мер, мен, " +
        "наш, начал, начин, недел, наход, налог, нато, нос, напряж, народ, " +
        "област, образ, остров, отраж, обреч, особ, определ, обращ, общ, " +
        "оппон, обстанов, ответ, отказ, отрасл, объем, объект, опроверж, " +
        "повтор, пут, пора, получ, полн, плат, прав, правил, проект, прост, постав, " /* правл, */ +
        "процесс, преступ, планет, полит, послед, продолж, предел, повестк, постоян, " +
        "провер, предлож, пространств, приним, призна, пол, полн, прос, против, " +
        "пропон, прекрат, поряд, приемл, пресловут, проявл, привет, показ, поним, " +
        "ран, рад, развит, разработ, ракет, " +
        "сид, свиде, след, слов, случ, стран, сил, систем, средств, стол, столиц, сведен, " +
        "сторон, связ, ситуац, союз, совет, стат, суверен, содерж, соверш, свет, слон, " +
        "состоя, сказ, состав, стро, стрем, соответств, справ, скор, сто, существ, сообщ, " +
        "секрет, смерт, суверен, " +
        "тиш, тест, текст, точк, толк, труд, такт, " +
        "удел, устав, услов, участ, уваж, уступ, улиц, указ, уведом, устран, " +
        "формул, цен, цел, шир, " +
        "явл, ясн"
    ),
    prefixes: parseMorphemes(
      "в-, во-, взо-, вне-, внутри-, возо-, вы-, до-, еже-, за-, зако-," +
        "изо-, испод-, к-, кое-, ку-, меж-, междо-, между-, на-, над-, надо-, " +
        "наи-, не-, недо-, ни-, низо-, о-, об-, обо-, около-, от-, ото-, па-, " +
        "пере-, по-, под-, подо-, поза-, после-, пра-, пред-, преди-, предо-, про-," +
        "противо-, разо-, с-, со-, сверх-, среди-, су-, тре-, у-, без-, бес-, вз-," +
        "вс-, воз-, вос-, из-, ис-, низ-, нис-, обез-, обес-, раз-, рас-, роз-, рос-," +
        "разъ-, безъ-, съ-, " +
        "через-, черес-, чрез-, чрес-, пре-, при-, зло-, взаимо-, псевдо-, анти-, гео-," +
        "везде-, много-, одно-, неодно-, дву-, двух-, " +
        "мега-, супер- "
    ),
    suffixes: parseMorphemes(
      // Добавьте список суффиксов
      "-айш-, -е-, -ее-, -ей-, -ейш-, -же-, -ше-, -л-, -ел-, -ти, -ть, -и, -ащ-," +
        "-ящ-, -вш-, -ш-, -ущ-, -ющ-, -ем-, -им-, -ом-, -нн-, -енн-, -онн-, -т-, -ить, -а-, -я-," +
        "-учи-, -ючи-, -вши-, -ши-, -ес-, -ен-, -ер-, -й-, -ейш-, -айш-, -к-, -ик-, " +
        "-ек-, -ок-, -чик, -ёк-, -еньк-, -оньк-, -ечк-, -ичк-, -ич-, -нич-, -очк-, -ашк-, -ашн-, -ишк-, -ашек-" +
        "-ушк-, -юшк-, -ышк-, -ец-, -иц-, -енк-, -инк-, -онк-, -ин-, -ищ-, -ушек, -ышек," +
        "-ёныш, -еньк-, -оньк-, -ехоньк-, -оханьк-, -ёшеньк-, -ошеньк-, " +
        "-юсеньк-, -енн-, -оват-, -еньк-, -оньк-, -енечко, -онечко, -еват, -оват, -тель, -итель, -нитель, " +
        "-чик, -щик, -ник, -ир, -ниц-, -к-, -иц-, -юх, -ёнок, -ушк-, -ышк-, -ость, -ост-, -як, -ун, -ач, " +
        "-ив-, -ивн-, -чив-, -лив-, -ист-, -изм-, -ск-, -еск-, -ов-, -ев-, -н-, -евит-, -ин-, " +
        "-ова-, -ева-, -ыва-, -и-, -я-, -е-, -а-, -а, -о, -у, -ийск-, -ств-, -еств, -арн-, -арик, -ац-," +
        "-от-, -лог, -ь, -ени-, -иат-, -ат-, -ят-, " +
        "-чн-, -ованность, -явш-, -яющ-, -вск-, -овск-"
    ),
    endings: parseMorphemes(
      "-а, -ам, -ами, -ас, -ах, -ая, -е, -её, -ей, -ем, -еми, -емя," +
        "-ех, -ею, -ёт, -ёте, -ёх, -ёшь, -и, -ие, -ий, -ия, -им, -ими, -ит," +
        "-ите, -их, -ишь, -ию, -ми, -мя, -о, -ов, -ого, -ое, -оё," +
        "-ой, -ом, -ому, -ою, -у, -ум, -умя, -ут, -ух, -ую, -шь, -ый, -ые" +
        "-а, -я, -ы, -и, -ов, -ей, -е, -ам, -ям, -у, -ю," + // сущ. и.м.-в.п.
        "-ой, -ёй, -ами, -ями, -ом, -ем, -ём, -ах, -ях," + // сущ. т.п.-п.п.
        "-у, -ю, -ешь, -ет, -ем, -ете, -ут, -ют, -ишь, -ит, -им, -ите, -ат, -ят," + // гл. 1/2 спряж.
        "-ый, -ий, -ая, -яя, -ое, -ее, -ые, -ие, -ого, -его, -ой, -ей, -ых, -их," + // прил. им./род.п.
        "-ому, -ему, -ой, -ей, -ым, -им, -ую, -юю, -ыми, -ими, -ом, -ем" + // прил. дат./вин./твор.п.
        "-ийся, -егося, -емуся, -имся, -емся, -аяся, -ейся, -уюся, -ееся, " + // причастия ед.ч.
        "-яюсь, -ится, -утся, -ется, -атся, -ются, -ешься, -ишься, " +
        "-иеся, -ихся, -имся, -имися, -сь, -ся" // причастия мн.ч.
      // убрано: -м,
    ),
  };

  return dict;
}
