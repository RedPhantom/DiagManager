    <?php
/* Load the data from the CSV file */
$did = $_GET['id'];
$f = $_GET['f']; // f=1 - increase priority f=2 - return priority of a specific id.

if (!isset($f))
	{
	    exit();
	}

$csvPath = "./resources/data/searches.csv";
$csvFile = file($csvPath);
$data = [];
foreach($csvFile as $line)
	{
	    $data[] = str_getcsv($line);
	}
	
$row = array_search((string)$did, array_column($data, 0));



switch ($f)
	{
case 1:
	/* Locate the row with the specified id */
	if ($row === false)
		{
            $extrarow = count($data); // returns NUMBER, not INDEX so there's no need to +1 .
            $data[$extrarow][0] = (string)$did;
            $data[$extrarow][1] = (string)0;
		}
	  else
		{
            $oldnum = (int)$data[$row][1];
            $newnum = $oldnum + 1;
            $data[$row][1] = (string)$newnum; // Search succeded. Now proceed to update the row.
		}

	break;

case 2:
	echo ($data[$row][1]);
	break;
	}

$newCSVData = "";

foreach($data as $datum)
	{
        if ($datum[0] != "")
            {
                $newCSVData.= ($datum[0] . "," . $datum[1] . "\n"); // already at end of file, no need to add a new line?
            }
	}
file_put_contents($csvPath, $newCSVData);