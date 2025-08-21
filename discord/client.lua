
local myName
local targetName
local id 



RegisterCommand('player', function(nothing, args)
    id = tonumber(args[1])
    local targetPlayer = GetPlayerFromServerId(id)

    if targetPlayer == -1 then 
        print('Invalid ID!')
        -- Maybe show it to the chat
        return
    end

    myName = GetPlayerName(GetPlayerFromServerId(GetPlayerServerId(PlayerId())))

    targetName = GetPlayerName(targetPlayer)

    TriggerServerEvent('fetchDiscordIdentifier', id, GetPlayerServerId(PlayerId()))
end)

RegisterNUICallback('close', function(data, cb) 
    SetNuiFocus(false,false)
    SendNUIMessage({ action = 'close' })
    cb('ok');
end)

RegisterNetEvent('showUI', function(discordIdentifier)
    local discordId = string.sub(discordIdentifier, 9, -1)
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "show", targetName = targetName, serverId = id, discordIdentifier = discordIdentifier, idToUse = discordId, adminName = myName})
end)