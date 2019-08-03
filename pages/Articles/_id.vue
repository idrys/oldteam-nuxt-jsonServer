<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>

            <h3 class="display-3" justify-center>Ukraina</h3>
            <div class="title mb-3"><p>Szczyt</p></div>

          <div v-html="body"> </div>
          <v-btn
            class="mx-0"
            color="primary"
            large
          >
          Zobacz galerie
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  //http://localhost:3000/Articles/1
  data (){
    return{
      body: 
        `
          <br />
          <div class="subheading"><p>Chciałbym podzielić się ze swoimi salbumrzeżeniami z kolejnego wyjazdu, może tym razem będzie bardziej poważnie, bo i może na tym wyjeździe więcej było zadumy niż wódki.
          <br />
          <br />
          </p>
          </div>

          <div class="subheading"><p>
          Dawna piosenka harcerska w swoim fragmencie mówi o tym, jak drużynowy opowiada starodawne dzieje wspominając rycerstwo spod kresowych stanic. Ano ludzie w tych stanicach, na skraju Rzeczpospolitej, U jej Kraja (stąd U Kraina), dbali o to, aby Tatar czy Turek nie spustoszył kraju, a ten pierwszy jeszcze dodatkowo nie zabrał ludzi w jasyr. Dziś stanic tych nie ma a jest w tym miejscu Ukraina.
          <br />
          <br />

          A Ukraina to dziwny kraj.
          <br />
          <br />

          Piękna przyroda. Gdzie nie gdzie bez człowieczej ingerencji. Bezkres gór, bezkres kraju.
          To tu widać jak łuk Karpat zaczyna pomalutku skręcać na południe, poszukując
          cieplejszych promieni słońca. Tu w lasach gospodarzami prawdziwymi są ryś, wilk i
          niedźwiedź, a turysta musi pilnować się, żeby nie odwiedzili go oni niespodziewanie na
          kolacji przy ognisku. Kosodrzewina jest momentami tak gęsta, że przechodzący nią
          podróżnik, co jakiś czas musi dać odpoczynek swoim rękom, które ciężko pracują aby
          reszta ciała mogła iść do przodu. No i słońce tu bardziej wschodzi niż zachodzi, bo
          przecież jesteśmy bardziej na wschód.
          <br />
          <br />

          Ale kraj ten to zarazem bagaż trosk, nieszczęść niesprawiedliwości i biedy. Kapuściński
          napisał kiedyś, że ta Ukraina to nasze Bałkany, porównując niestety nie urok przyrody
          ale wzajemną nienawiść istniejącą między ludźmi.<br /><br />

          Nie sposób będąc w tym kraju nie zadumać się nad niepojętą ludzka naturą i zadać choć
          takie pytanie: czemu na ziemi chrześcijańskiej tak bardzo zapomniano o Chrystusowych
          słowach „Kto pierwszy jest bez winy niech rzuci kamieniem” i często w bliźniego rzucało
          się nie tylko kamieniem, wyrzucając ze swojej pamięci własne przewiny.<br /><br />

          Udało się Wam Szanowni Podróżnicy zdobyć Howerlę najwyższą górę Ukrainy. Cel
          wyjazdu został osiągnięty. Nie wiem czy się zgodzicie ze mną Romualdem P, że stojąc na
          Howerli łatwo odszukać w wyobraźni tę Polskę z lat 1918 – 1939. Tu przecież w te
          okolice Polacy jeździli do sanatoriów (Truskawiec), na piesze wycieczki górskie, to tu
          budowało się polskie schroniska, to tu była Polska i miała być zawsze.<br /><br />

          Udało się Wam Szanowni Podróżnicy chodząc po uliczkach Lwowa pooddychać
          klimatem tego polskiego od zawsze miasta. Nie wiem czy i tym razem się zgodzicie z
          Romualdem P., że w tym mieście trzeba się zatrzymać choć przez chwile i wsłuchać się
          w polskie bicie serca – bo to miasto od zawsze polskie, choć dziś położone w granicach
          suwerennej Ukrainy. Smutno pewnie przy tym a na pewno i nostalgicznie. Wsłuchując
          się to miasto może ktoś usłyszy jeszcze okrzyki mieszkańców, którzy oznajmiali o
          zbliżającej się ordzie tatarskiej, może inny wyłapie z tumultu i zgiełku miejskiego słowa
          Jana Kazimierza, który ślubował w tutejszej Katedrze, a może jeszcze inny przechodzień
          zobaczy jednego z wielu małych obrońców granic miasta, którzy dla jego obrony oddali
          wszystko.<br /><br />

          No i racja, ale czyż Ukrainiec zdobywszy Howerlę nie będzie patrzył na Swój Kraj
          rozległy, którego doczekał się po latach walk i upokorzeń. Czy dla niego ta Góra nie
          będzie symbolem ukraińskości. Trudno żeby nie była.<br /><br />

          Czy dla Ukraińca mieszkańca Lwowa nie jest łatwiej niż słowa Jana Kazimierze usłyszeć
          okrzyki zwycięstwa spod Żółtych Wód, Korsunia czy Piławiec, gdzie pogonili oni wojsko
          i szlachtę polską. Przecież wsłuchując się odgłosy Lwowa, Stanisławowa (dziś Iwano-
          Frankowsk), czy Wiśniowca Ukrainiec będzie je kojarzył z bohaterami z Siczy, a nie z
          Małym Rycerzem czy wesołym Zagłobą.<br /><br />

          Inaczej miejsca te kojarzyć będzie Polak inaczej Ukrainiec, bo jednak trochę inaczej biją
          ich serca. To naturalne i normalne. Czemu więc na początku napisałem że Ukraina to
          dziwny kraj. Bo nie jest dla mnie, prostego obserwatora ludzkich perypetii, zrozumiałym
          czemu temu innemu biciu serca musiało, tak często, na tej ziemi, towarzyszyć tyle
          nienawiści z obu stron. Czy inaczej musi znaczyć źle. Czy inaczej musi oznaczać krew
          tego kto nie jest taki jak ja. Ludzi (niektórzy) tu żyjący niestety pokazali, że inności nie
          akceptują i dlatego dziwna i smutna to ziemia, bo dużo w niej krwi, jak i na Bałkanach.
          A czemu nie może być tak że i Polak i Ukrainiec razem stanąwszy na Howerli nie będą,
          owszem, widzieli innych rzeczy, ale jeden drugiemu poda kawałek czekolady szanując to
          że otrzymał w rewanżu łyk wody do picia. Czemu nie może być tak, że we Lwowie
          mieście polskim leżącym w granicach tego czy innego kraju nie może Polak z Ukraińcem
          razem pójść na piwo a potem na rynek, gdzie każdy będzie słyszał inne odgłosy tego
          samego miasta. Według mnie może tak i być. Powiem więcej, są ludzie, którzy żyją już
          dziś obok siebie szanując swój inny rytm bicia serca. Tak ma być a inna droga, wcześniej
          czy później prowadzi do łez, samotności i pustki.<br /><br />

          Bo chyba trzeba wybrać czy lepiej żeby było między Lachami i dawnymi Kozakami, jak
          dziś mają Francuz z Niemcem w Alzacji, gdzie śmiejąc się ze swoich narodowych
          przywar, razem piją piwo i jedzą kiełbasę, czy też lepiej jest tak, jak dziś sąsiedzi mają na
          granicy rosyjsko – ukraińskiej czy serbsko – kosowskiej. Ja to chyba chciałbym jeść
          barszcz ukraiński i pić wódkę, niż martwic się, czy ktoś w celu odbudowy potęgi tego czy
          innego kraju nie będzie chciał mojego syna (Ksawerego P) zabrać do wojska
          „Homo homini lupus” (człowiek człowiekowi wilkiem) a może „Człowiek eto zwuczit
          gordo” (człowiek to brzmi dumnie) – wybierać może każdy, skutki wyborów ponosi
          wielu.<br /><br />

          Uff ale było poważnie. Ale czasem może trzeba. Bo podróż jest nauczycielką życia a życie
          jest podróżą – stąd więc takie mądrości, których źródłem była Wasza wizyta na
          Ukrainie…kraju dziwnym ale pięknym..
          <br />
          </p>
                      <div class="title mb-3"><p>Romulad P</p></div>
        </div>
      `
    }
  }
}
</script>
