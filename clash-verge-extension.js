// Paste this whole file into the current subscription's extension script.
// The two remote rule lists are refreshed automatically every hour.
function main(config, profileName) {
  const base = 'https://raw.githubusercontent.com/RLIZA/clash-personal-rules/main/';
  const groupName = '国内/校园';
  const existingGroups = config['proxy-groups'] || [];
  const upstream = existingGroups.find(g => g.name !== groupName && g.type === 'select');
  const downloadProxy = upstream ? upstream.name : 'DIRECT';

  config['proxy-groups'] = [
    { name: groupName, type: 'select', proxies: downloadProxy === 'DIRECT' ? ['DIRECT'] : ['DIRECT', downloadProxy] },
    ...existingGroups.filter(g => g.name !== groupName)
  ];

  config.dns = {
    ...(config.dns || {}),
    'direct-nameserver': ['system'],
    'direct-nameserver-follow-policy': false,
    'nameserver-policy': {
      ...((config.dns || {})['nameserver-policy'] || {}),
      'geosite:cn': ['system'],
      '+.163.com': ['system'],
      '+.qianwen.com': ['system'],
      '+.cityu.edu.hk': ['system']
    }
  };

  function provider(file) {
    return {
      type: 'http', behavior: 'classical', format: 'yaml',
      url: base + file,
      path: './ruleset/personal-' + file,
      interval: 3600,
      proxy: downloadProxy
    };
  }
  config['rule-providers'] = {
    ...(config['rule-providers'] || {}),
    'personal-campus': provider('campus-mainland.yaml'),
    'personal-direct': provider('direct.yaml')
  };

  const ownedRules = [
    'RULE-SET,personal-campus,' + groupName,
    'GEOSITE,cn,' + groupName,
    'RULE-SET,personal-direct,DIRECT'
  ];
  config.rules = [...ownedRules, ...(config.rules || []).filter(rule => !ownedRules.includes(rule))];
  return config;
}
