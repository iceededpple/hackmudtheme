function (context, args){
	var t = args.t;
	var gl = #fs.scripts.get_level({name:t.name});
	if(gl != 4)
	{
		return {ok:false, msg:"`X  -- ATTEMPTED TO SCAN INSEC SCRIPT -- `" + gl}
	}
	var r = t.call();
	var r2 = r;
	var m1 = r.match(/(\w+) \| (\w+)/);
	
    r = t.call({});
	var m2 = r.match(/ith (\w+):"(\w+)"$/);
	var z = "";
	if(m1 && m2)
	{
		var o = {};
		o[m2[1]] = m1[2];
		r = t.call(o); // {cmd:"strategy"}
		var m3 = r.match(/tegy (\w+)/);
		if(m3)
		{
			var pkl = ["p", "pass", "password"];
			for(var pk in pkl)
			{
				o[m2[1]] = m1[2];
				o[pkl[pk]] = m3[1]
				r = t.call(o); // {cmd:"strategy"}
				if(r.indexOf('Authenticated') > -1)
					break;
			}
			
			o[m2[1]] = m1[1];
			r = t.call(o); // {cmd:"projects"}
			var pm = "";
			var um = "";
			for (var fp in r)
			{
				var m4 = r[fp].match(/([a-zA-Z][\w]+\.[a-zA-Z][\w]+)/);//([\w.]+)/);
				if(m4)
				{
					o[m2[1]] = m2[2];
					o['project'] = m4[1];
					r2 = t.call(o);
					pm = pm + m4[1] + " `1Res`: " +(typeof r2)+ "\n"
					for(var fs in r2)
					{
						var m5 = r2[fs].match(/^([\w]+\.[\w]+)$/);//([\w.]+)/);
						if(m5)
						{
							um = um + r2[fs] + "\n"
						}
					}
				}
			}
			z = "`2 -- SCANNING T1`: `2" + t.name + "`\n\n`1Projects`:\n" + z + pm + "\n`1Scripts`:\n" + um
		}
		
		return z
	} else
	{
		return {ok:false, msg:"Parse Error"}
	}
}