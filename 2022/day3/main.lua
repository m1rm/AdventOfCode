local io = require "io"

priority_map = {
  a=1, A=27,
  b=2, B=28,
  c=3, C=29,
  d=4, D=30,
  e=5, E=31,
  f=6, F=32,
  g=7, G=33,
  h=8, H=34,
  i=9, I=35,
  j=10, J=36,
  k=11, K=37,
  l=12, L=38,
  m=13, M=39,
  n=14, N=40,
  o=15, O=41,
  p=16, P=42,
  q=17, Q=43,
  r=18, R=44,
  s=19, S=45,
  t=20, T=46,
  u=21, U=47,
  v=22, V=48,
  w=23, W=49,
  x=24, X=50,
  y=25, Y=51,
  z=26, Z=52
}

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

function calculate_score_by_matching_items(input)

  local score = 0
  for index,goods in pairs(input) do
    local rucksack1 = string.sub(goods,1, #goods/2)
    local rucksack2 = string.sub(goods, #goods/2+1, #goods)

    for char in rucksack1:gmatch"." do
      if(string.find(rucksack2, char)) then
        score = score + priority_map[char]
        break
      end
    end
  end
  return score
end

local input = lines_from('challenge_input.txt')
local item_priority_score = calculate_score_by_matching_items(input)

local looper = 0
local tmp = {}
score = 0
for index,goods in pairs(input) do
  table.insert(tmp, goods)
  looper = looper +1
  if(looper == 3) then
  --[[ as soon as a matching character is found, the loop can be stopped ]]--
    for char in tmp[1]:gmatch"." do
      if(string.find(tmp[2], char) and string.find(tmp[3], char)) then
        score = score + priority_map[char]
        break
      end
    end
    --[[ reset helper variables for next triple ]]--
    looper = 0
    tmp[1] = nil
    tmp[2] = nil
    tmp[3] = nil
  end
end

--[[print(item_priority_score)]]--
print(score)
