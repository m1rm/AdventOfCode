local io = require "io"

function file_exists(file)
  local f = io.open(file, "rb")
  if f then f:close() end
  return f ~= nil
end

function lines_from(file)
  if not file_exists(file) then return {} end
  local lines = {}
  for line in io.lines(file) do
    lines[#lines + 1] = line
  end
  return lines
end

function calculate_score_by_input(lines)
  local score = 0
  for index,game in pairs(lines) do
    if (game == 'A X' or game == 'B Y' or game == 'C Z') then
      score = score + 3
    end
    if (game == 'A Y' or game == 'B Z' or game == 'C X') then
      score = score + 6
    end
    if (string.match(game, 'X')) then
      score = score +1
    end
    if (string.match(game, 'Y')) then
      score = score + 2
    end
    if (string.match(game, 'Z')) then
      score = score + 3
    end
  end
  return score
end


local file = 'challenge_input.txt'
local lines = lines_from(file)
score_by_input = calculate_score_by_input(lines)

print('score: ', score_by_input)
