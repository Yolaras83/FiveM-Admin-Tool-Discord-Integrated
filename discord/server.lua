RegisterNetEvent('fetchDiscordIdentifier', function(id, myId) 
    local discordIdentifier = GetPlayerIdentifierByType(id, 'discord');
    if not discordIdentifier then 
        DropPlayer(id, "You are not connected to discord! (Realized it late!)")
        return 
    end

    TriggerClientEvent('showUI', myId, discordIdentifier)
end);