#pragma strict

@script RequireComponent(SpriteRenderer);

@System.NonSerialized
public var oLeft : Tiling;

@System.NonSerialized
public var oRight : Tiling;

function Start () 
{
}

function Update () 
{
}

function OnBecameVisible ()
{
	if (!oLeft)
	{
		oLeft = CreateBuddy( "left" );
	}
	
	if (!oRight)
	{
		oRight = CreateBuddy( "right" );
	}
}

function CreateBuddy ( strDirection ) : Tiling
{
	Debug.Log("Tiling::CreateBuddy");
	var oBuddy : Tiling = Tiling.Instantiate(this, this.transform.position, this.transform.rotation);
	
	if (Random.value < 0.1) 
	{
		strDirection += "Deviate";
		
		if (Random.value < 0.5)
		{
			strDirection += "Down";
		}
		else 
		{
			strDirection += "Up";
		}
	}
	
	// TODO: Select texture smarter I guess
	oBuddy.renderer.material.mainTexture = Tiling.GetMaterial();

	switch(strDirection) 
	{
		case "left":
			oBuddy.transform.position.x -= this.renderer.bounds.size.x;
			oBuddy.oRight = this;
			break;
		case "right":
			oBuddy.transform.position.x += this.renderer.bounds.size.x;
			oBuddy.oLeft = this;
			break;
			
		case "leftDeviateDown":
			oBuddy.transform.position.y -= this.renderer.bounds.size.y;
			oBuddy.oRight = this;
			break;
		case "leftDeviateUp":
			oBuddy.transform.position.y += this.renderer.bounds.size.y;
			oBuddy.oRight = this;
			break;
			
		case "rightDeviateDown":
			oBuddy.transform.position.y -= this.renderer.bounds.size.y;
			oBuddy.oLeft = this;
			break;
		case "rightDeviateUp":
			oBuddy.transform.position.y += this.renderer.bounds.size.y;
			oBuddy.oLeft = this;
			break;
		
		default:
			break;
	}

	return oBuddy;
}

static function GetMaterial() : Texture
{
	var textures : Object[] = Resources.LoadAll("Tiles/Sprites", Texture);
	Debug.Log("Textures: " + textures.Length);

    var texture : Texture = textures[Random.Range(0, textures.Length)];
	
	return texture;
}