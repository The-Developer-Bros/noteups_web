# Go recursively Deep in each directory and create a json file called details.json in each directory
# sample details.json
# {
#     "name": "{current subject directory name}",
#     "description": "{current subject directory description}",
#     "price": "{current subject directory price}",
# }

#!/bin/sh
function find_dirs_without_details_json() {
    find . -type d -name "details.json" -prune -o -type d -print
}

function recursive_json_file_creation() {
    for dir in $(find_dirs_without_details_json); do
        echo "Creating json file in $dir"
        echo "{
            \"name\": \"$(basename $dir)\",
            \"description\": \"$(basename $dir)\",
            \"price\": \"$(basename $dir)\"
        }" > $dir/details.json
    done
}

recursive_json_file_creation