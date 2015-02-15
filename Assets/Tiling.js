#pragma strict

@System.NonSerialized
public var oLeft : Tiling;

@System.NonSerialized
public var oRight : Tiling;

enum DEVIATION {
	DOWN,
	UP
}

enum DIRECTION {
	LEFT,
	RIGHT
}

function Start () 
{
	var that = this;
	/*
	var fnClosure : Function;
	fnClosure = function (a : String) : void{
		that.EnsureBuddies();
		};*/
	/*
	var oMonoBehaviours : MonoBehaviour[] = this.GetComponentsInChildren(MonoBehaviour) as MonoBehaviour[];
	for (oMonoBehaviour in oMonoBehaviours)
	{
		//oMonoBehaviour.
	}*/
}

function Update () 
{
	
}

function EnsureBuddies()
{
	if (!oLeft)
	{
		oLeft = CreateBuddy( DIRECTION.LEFT );
	}
	
	if (!oRight)
	{
		oRight = CreateBuddy( DIRECTION.RIGHT );
	}
}

function CreateBuddy ( cDirection : DIRECTION ) : Tiling
{
	Debug.Log("Tiling::CreateBuddy");
	var oBuddy : Tiling = Tiling.Instantiate(this, this.transform.position, this.transform.rotation);
	var cDeviation : DEVIATION;
	
	if (Random.value < 0.1) 
	{
		if (Random.value < 0.5)
		{
			cDeviation = DEVIATION.DOWN;
		}
		else 
		{
			cDeviation = DEVIATION.UP;
		}
	}
	
	switch(cDirection) 
	{
		case DIRECTION.LEFT:
			oBuddy.transform.position.x -= this.renderer.bounds.size.x;
			oBuddy.oRight = this;
			break;
		case DIRECTION.RIGHT:
			oBuddy.transform.position.x += this.renderer.bounds.size.x;
			oBuddy.oLeft = this;
			break;
	}
	
	switch(cDeviation)
	{
		case DEVIATION.DOWN:
			oBuddy.transform.position.y -= this.renderer.bounds.size.y;
			break;
		case DEVIATION.UP:
			oBuddy.transform.position.y += this.renderer.bounds.size.y;
			break;
			
		default:
			break;
	}

	return oBuddy;
}
