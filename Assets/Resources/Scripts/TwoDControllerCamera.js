

var cameraTransform : Transform;
private var _target : Transform;

// The distance in the x-z plane to the target

var distance = 7.0;

// the height we want the camera to be above the target
var height = 3.0;

var angularSmoothLag = 0.3;
var angularMaxSpeed = 15.0;

var heightSmoothLag = 0.3;

var snapSmoothLag = 0.2;
var snapMaxSpeed = 720.0;

var clampHeadPositionScreenSpace = 0.75;

var lockCameraTimeout = 0.2;

private var headOffset = Vector3.zero;
private var centerOffset = Vector3.zero;

private var heightVelocity = 0.2;
private var emergencyHeightVelocity = 2.0;
private var angleVelocity = 0.0;
private var snap = false;
private var controller : CharacterController;
private var targetFloatHeight = -2.0; 

function Awake ()
{
	if(!cameraTransform && Camera.main)
		cameraTransform = Camera.main.transform;
	if(!cameraTransform) {
		Debug.Log("Please assign a camera to the script.");
		enabled = false;	
	}
			
		
	_target = transform;
	if (_target)
	{
		controller = _target.GetComponent(CharacterController);
	}
	
	if (controller)
	{
		var characterController : CharacterController = _target.GetComponent.<Collider>();
		centerOffset = characterController.bounds.center - _target.position;
		headOffset = centerOffset;
		headOffset.y = characterController.bounds.max.y - _target.position.y;
	}
	else
		Debug.Log("Please assign a target to the camera that has a CharacterController script attached.");

	
	Cut(_target, centerOffset);
}

function DebugDrawStuff ()
{
	Debug.DrawLine(_target.position, _target.position + headOffset);

}

function AngleDistance (a : float, b : float)
{
	a = Mathf.Repeat(a, 360);
	b = Mathf.Repeat(b, 360);
	
	return Mathf.Abs(b - a);
}

function Apply (dummyTarget : Transform, dummyCenter : Vector3)
{
	// Early out if we don't have a target
	if (!controller)
		return;
	
	var targetCenter = _target.position + centerOffset;
	var targetHead = _target.position + headOffset;

//	DebugDrawStuff();

	// Damp the height
	var currentHeight = cameraTransform.position.y;
	targetHeight = _target.position.y + targetFloatHeight;
	currentHeight = Mathf.SmoothDamp (currentHeight, targetHeight, heightVelocity, heightSmoothLag);
	
	if (!(_target.renderer.isVisible))
	{
		// Shit, try to catch up
		currentHeight = Mathf.SmoothDamp (currentHeight, targetHeight, emergencyHeightVelocity, heightSmoothLag);
	}

	// Set the position of the camera on the x plane to:
	// distance meters behind the target
	cameraTransform.position.x = targetCenter.x;
	
	// Set the height of the camera
	cameraTransform.position.y = currentHeight;
}

function LateUpdate () {
	Apply (transform, Vector3.zero);
}

function Cut (dummyTarget : Transform, dummyCenter : Vector3)
{
	var oldHeightSmooth = heightSmoothLag;
	var oldSnapMaxSpeed = snapMaxSpeed;
	var oldSnapSmooth = snapSmoothLag;
	
	snapMaxSpeed = 10000;
	snapSmoothLag = 0.001;
	heightSmoothLag = 0.001;
	
	snap = true;
	Apply (transform, Vector3.zero);
	
	heightSmoothLag = oldHeightSmooth;
	snapMaxSpeed = oldSnapMaxSpeed;
	snapSmoothLag = oldSnapSmooth;
}

function GetCenterOffset ()
{
	return centerOffset;
}
