package.path = "../util/?.lua;" .. package.path

local filereader = require "filereader"

local input = filereader.lines_from('challenge_input.txt')

function split(s, delimiter)
     local result = {};
    for match in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match);
    end
    return result;
end

local score = 0
for index,sections in pairs(input) do
  local splitPairs = split(sections, ',')
  local splitPair1 = split(splitPairs[1], '-')
  local splitPair2 = split(splitPairs[2], '-')

  if ((splitPair1[1] <= splitPair2[1] and splitPair1[2] <= splitPair2[2]) or (splitPair1[1] >= splitPair2[1] and splitPair1[2] >= splitPair2[2])) then
    score = score +1
  end

end

print(score)
