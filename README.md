# SimpleThree PointLight
**Type:** Behavior

Makes an object act as a point of light.

# Properties

| Name | Type | Description | Options |
|------|------|-------------|---------|
|**Color**| _color_ | The pointlight's color in RGB format. Default value: `ffffff` |  |
|**Intensity**| _float_ | The point light's intensity. Default value: `1` |  |
|**Distance**| _float_ | Maximum point light's distance in pixels (0 = no limit).  |  |
| | | **Transform**| |
|**Elevation**| _float_ | Point light's elevation in pixels.  |  |

# ACES

## Actions

| Name | Description | Parameters |
|------|-------------|------------|
| |**Point Light**| |
|**Set The Point light Color**| Set the Point light Color. | - **Color** _string_ = `"#ffffff"`: Point light color in CSS-style string  |
|**Set Point Light Intensity**| Set the Point Light's Intensity. | - **Intensity** _number_ = `1`: The new point light's intensity.  |
|**Set PointLight maximum distance in 2D pixels**| Set the Point Light's maximum distance in pixels. | - **Distance** _number_: The point light's maximum distance in 2D pixels (0 = no limit).  |
|**Set The Point light Color from number**| Set the Point light Color. | - **Color** _number_ = `ffffff`: Point light color using rgb() expression  |
| |**Transform**| |
|**Set Point Light's Elevation from 2D pixels**| Set the Point Light's Elevation from 2D pixel length. | - **Elevation** _number_: The new point light's elevation in 2D Pixels.  |

## Conditions

| Name | Description | Parameters |
|------|-------------|------------|

## Expressions

| Name | Type | Description | Parameters |
|------|------|-------------|------------|
| | |**Point Light**| |
|**Color**<br/><small>**Usage:** `MyObject.SimpleThree PointLight.Color`</small>|`number`| The PointLight Color. |  |
|**Intensity**<br/><small>**Usage:** `MyObject.SimpleThree PointLight.Intensity`</small>|`number`| The PointLight Intensity. |  |
|**Distance**<br/><small>**Usage:** `MyObject.SimpleThree PointLight.Distance`</small>|`number`| The PointLight Distance. |  |
| | |**Transform**| |
|**Elevation**<br/><small>**Usage:** `MyObject.SimpleThree PointLight.Elevation`</small>|`number`| The PointLight Elevation. |  |