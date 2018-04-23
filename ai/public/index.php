<?php
    require 'chatterbotapi.php';

    $factory = new ChatterBotFactory();

    $bot1 = $factory->create(ChatterBotType::CLEVERBOT);
    $bot1session = $bot1->createSession();

    $bot2 = $factory->create(ChatterBotType::PANDORABOTS, 'b0dafd24ee35a477');
    $bot2session = $bot2->createSession();

    $s = 'i love you :D';
    $s = $bot1session->think($s);
    $s2 = $bot2session->think($s);
    echo $s;
    echo "<br>".$s2;
    /*
    while (1) 
    {
        echo "bot1> $s\n";

        $s = $bot2session->think($s);
        echo "bot2> $s\n";

        $s = $bot1session->think($s);
    }*/
?>