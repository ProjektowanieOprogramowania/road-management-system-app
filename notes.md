##Uruchomienie
ng serve -o

##Generowanie elementów
link: https://angular.io/cli/generate

###komendy:
ng g c -> wygeneruj folder z komponentem + styl + module
ng g s -> wygeneruj folder + service (do łączności z API)
ng g m-> wygeneruj moduł do zepnięcia komponentów


##Dokumentacja

###Struktura folderów

- common [ważne]
-- models -> modele/interfejsy do obiektów
-- utils -> dodatkowe metody/klasy , jakaś logika np. formatowanie daty itp, mnożenie wektora (przykład)

- core [mało ważne]
-- guards -> ochrona na endpointy
-- interceptors -> filtrowanie protokołu http

- pages [ważne]
-- nazwa_strony -> każdy folder reprezentuje jedną stronę (component jeden lub wiele). Każdy folder musi mieć swój moduł.
    ->> Na początek trzeba stworzyć moduł komendą, a potem generować komponenty (opcja --flat nie tworzy nowego folderu).
    ->> Po stworzeniu strony dopisac routing w module strony, a następnie podpiąć ten moduł do app-routing.module.ts
    ->> Trzeba też zadeklarować routing do navbara, jesli chcemy się przełączać


- service [średnio ważne]
-- nazwa_serwisu -> każdy folder odpowiada za pozyskiwanie danych z serwisu

- shared [średnio ważne]
-- components -> komponenty, które będą używane więcej niż raz i są współdzielone pomiędzy stronami. Niezbyt częsty przypadek

##Biblioteka UI
https://www.primefaces.org/primeng/

