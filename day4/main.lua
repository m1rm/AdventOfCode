package.path = "../util/?.lua;" .. package.path

local filereader = require "filereader"

local input = filereader.lines_from('challenge_input.txt')

for index,sections in pairs(input) do
  print(sections)
end
