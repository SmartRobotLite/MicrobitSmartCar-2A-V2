
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/*****************************************************************************************************************************************
 *    智能小车 *****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#FF7F00" weight=21 icon="\uf185"
namespace microbit_CAR{

    export enum Colors {
        //% blockId="Red" block="红色"
        Red = 0x01,
        //% blockId="Green" block="绿色"
        Green = 0x02,
        //% blockId="Blue" block="蓝色"
		Blue = 0x03,
    }

    export enum Lights {
        //% block="灯1"
        Light1 = 0x00,
        //% block="灯2"
        Light2 = 0x01,
        //% block="灯3"
        Light3 = 0x02,
        //% block="灯4"
        Light4 = 0x03,
        All = 0x04
    }

    export enum LedForwardIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum LineState {
        //% blockId="WHITE" block="白线"
        WHITE = 0,
        //% blockId="BLACK" block="黑线"
        BLACK = 1
    }

    export enum LightSensorIndex {
        //% blockId="LEFT" block="左边"
        LEFT = 0,
        //% blockId="RIGHT" block="右边"
        RIGHT 
    }

    export enum MotorState {
        //% blockId="MOTOR_STOP" block="停止"
        STOP = 0,
        //% blockId="MOTOR_FOREWARD" block="正转"
        FOREWARD,
        //% blockId="MOTOR_BACKWARD" block="反转"
        BACKWARD
    }

    //var
    let lhRGBLight: MICROBITRGBLight.MICROBITLHRGBLight;

    //% blockGap=50 blockId=mbit_MotroCtrl block="设置左边电机|%leftState 右边电机|%rightState"
    //% weight=100
    //% blockGap=10
    //% color="#FF7F00"
    export function MotorCtrl(leftState: MotorState, rightState: MotorState): void {
        switch(rightState)
        {
            case MotorState.STOP:
                pins.setPull(DigitalPin.P8, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.setPull(DigitalPin.P13, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            break;
        case MotorState.FOREWARD:
                pins.setPull(DigitalPin.P8, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                pins.digitalWritePin(DigitalPin.P13, 1);
                break;
            break;
        case MotorState.BACKWARD:
                pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
                pins.digitalWritePin(DigitalPin.P8, 1);
                pins.setPull(DigitalPin.P13, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P13, 0);
                break;
            break;                   
            default:
            break;
        }
        switch(leftState)
        {
            case MotorState.STOP:
                pins.setPull(DigitalPin.P15, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.setPull(DigitalPin.P14, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P14, 0);
                break;
        case MotorState.FOREWARD:
                pins.setPull(DigitalPin.P15, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
                pins.digitalWritePin(DigitalPin.P14, 1);
                break;
        case MotorState.BACKWARD:
                pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
                pins.digitalWritePin(DigitalPin.P15, 1);
                pins.setPull(DigitalPin.P14, PinPullMode.PullDown);
                pins.digitalWritePin(DigitalPin.P14, 0);
                break;               
            default:
            break;
        }
    }
    
    /**
	 * Initialize RGB
	 */
	function initRGBLight() {
		if (!lhRGBLight) {
			lhRGBLight = MICROBITRGBLight.create(DigitalPin.P12, 4, RGBPixelMode.RGB);
		}
    }
    
    /**
         * Set the brightness of the strip. This flag only applies to future operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
    */
    //% blockId="mbit_setBrightness" block="设置彩灯亮度 %brightness"
    //% weight=87
    //% blockGap=10
    //% color="#76EE00"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        //init
        initRGBLight();
        lhRGBLight.setBrightness(brightness);
    }
     
    /**
     * Set the color of the colored lights, after finished the setting please perform  the display of colored lights.
     */
    //% blockId=mbit_setPixelRGB block="设置彩灯| %lightoffset|颜色为 %rgb"
    //% weight=86
    //% blockGap=10
    //% color="#76EE00"
    export function setPixelRGB(lightoffset: Lights, rgb: RGBColors)
    {
        //init
        initRGBLight();
        lhRGBLight.setPixelColor(lightoffset, rgb);
    }

    /**
     * Display the colored lights, and set the color of the colored lights to match the use. After setting the color of the colored lights, the color of the lights must be displayed.
     */
    //% blockId=mbit_showLight block="显示彩灯"
    //% weight=84
    //% blockGap=10
    //% color="#76EE00"
    export function showLight() {
        //init
        initRGBLight();
        lhRGBLight.show();
    }

    /**
     * Clear the color of the colored lights and turn off the lights.
     */
    //% blockId=mbit_mbit_clearLight block="关闭彩灯"
    //% weight=83
    //% blockGap=10
    //% color="#76EE00"
    export function clearLight() {
        //init
        initRGBLight();
        //operate
        lhRGBLight.clear();
    }

    //% blockId=mbit_LineSensorChk block="检测到 |%index 寻迹传感器状态为 |%state"
    //% weight=100
    //% blockGap=10
    //% color="#9932CD"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LineSensorChk(index: LineSensorIndex, state: LineState): boolean {

        let temp: boolean = false;

        switch (index) {
            case LineSensorIndex.LEFT: {
                if (0 == pins.digitalReadPin(DigitalPin.P2)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                    }
                }
                break;
            }

            case LineSensorIndex.RIGHT: {
                if (0 == pins.digitalReadPin(DigitalPin.P1)) {
                    if (state == LineState.WHITE) {
                        temp = true;
                    }
                }
                else {
                    if (state == LineState.BLACK) {
                        temp = true;
                    }
                }
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_EdgeSensorChk block="|%index 边缘传感器检查到边缘"
    //% weight=100
    //% blockGap=10
    //% color="#9932CD"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function EdgeSensorChk(index: LineSensorIndex): boolean {
        switch (index) {
            case LineSensorIndex.LEFT: 
                if (1 == pins.digitalReadPin(DigitalPin.P2)) 
                {
                    return true;
                }
                return false;
            break;
            case LineSensorIndex.RIGHT:
                if (1 == pins.digitalReadPin(DigitalPin.P1)) 
                {
                    return true;
                }
                return false;
            break;
            default:
            break;
        }
        return false;
    }

    //% blockId=mbit_LightSensorValueGet block="|%index 亮度传感器值(0-100)"
    //% weight=100
    //% blockGap=10
    //% color="#0000FF"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function LightSensorValueGet(index: LightSensorIndex): number {

        let temp: number = 0;

        switch (index) {
            case LightSensorIndex.LEFT: {
                temp = pins.analogReadPin(AnalogPin.P1);
                temp = temp * 100 /1024;
                break;
            }

            case LightSensorIndex.RIGHT: {
                temp = pins.analogReadPin(AnalogPin.P2);
                temp = temp * 100 /1024;
                break;
            }
        }
        return temp;
    }

    //% blockId=mbit_UltraSensorValueGet block="超声检测距离(cm)"
    //% color="#0000FF"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function UltraSensorValueGet(): number {

        // send pulse   
        let list:Array<number> = [0, 0, 0, 0, 0];
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P1, 1);
        control.waitMicros(15);
        pins.digitalWritePin(DigitalPin.P1, 0);

        let d = pins.pulseIn(DigitalPin.P2, PulseValue.High, 43200);
        list[0] = Math.floor(d*17/1000);
        //let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(list[0]);
    }

    //% blockId=mbit_carInit block="初始化小车"
    //% weight=100
    //% blockGap=10
    //% color="#436EEE"
    export function carInit(): void {
        //
    }
}