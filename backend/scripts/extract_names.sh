#!/bin/bash
while IFS="," read -r rec_column1 rec_column2 rec_column3 rec_column4
do
  email=$(echo "$rec_column4" | tr '[:upper:]' '[:lower:]') 
  if [[ $email == *"@amazon.com"* ]]; then
    echo "$rec_column2 $rec_column3" >> $2
  fi
done < <(tail -n +2 $1)