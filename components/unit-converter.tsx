"use client";
import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";




const conversionRates: Record<string, Record<string, number>> = {
    length: {
        "Millimeter (mm)": 1,
        "Centimeter (cm)": 10,
        "Meter (m)": 1000,
        "Kilometer (km)": 1000000,
        "Inches (i)": 25.4,
        "Feet (ft)": 304.8,
        "Yards (yd)": 914.4,
        "Miles (mi)": 1609344,
    },
    weight: {
        "Grams (g)": 1,
        "Kilograms (kg)": 1000,
        "Ounces (oz)": 28.3495,
        "Pounds (lb)": 453.592
    },
    volume: {
        "Millimeters (ml)": 1,
        "Liters (l)": 1000,
        "Fluid Ounces (fl oz)": 29.5735,
        "Cups (cup)": 240,
        "Pints (pt)": 473.176,
        "Quarts (qt)": 946.353,
        "Gallons (gal)": 3785.41,
    }
}
const unitTypes: Record<string, string[]> = {
    length: [
        "Millimeter (mm)",
        "Centimeter (cm)",
        "Meter (m)",
        "Kilometer (km)",
        "Inches (i)",
        "Feet (ft)",
        "Yards (yd)",
        "Miles (mi)",
    ],
    weight: [
        "Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"
    ],
    volume: [
        "Milliliters (ml)",
        "Liters (l)",
        "Fluid Ounces (fl oz)",
        "Cups (cup)",
        "Pints (pt)",
        "Quarts (qt)",
        "Gallons (gal)",
    ]
}
export default function UnitConverterComponent() {

const [inputValue,setInputValue]=useState<number|null>(null)
const [inputUnit,setInputUnit]=useState<string|null>(null)
const [outputUnit,setOutputUnit]=useState<string|null>(null)
const [convertedValue,setConvertedValue]=useState<number|null>(null)

const handleInputChange=(e:ChangeEvent<HTMLInputElement>):void=>{
setInputValue(parseFloat(e.target.value))
}


const handleInputUnitChange=(value:string):void=>{
setInputUnit(value)
}

const handleOutputUnitChange=(value:string):void=>{
    setOutputUnit(value)
    }

const convertValue=():void=>{
if(inputValue!==null && inputUnit && outputUnit){
    let unitCategory:string|null=null

    for(const category in unitTypes){
if(unitTypes[category].includes(inputUnit)
&& 
unitTypes[category].includes(outputUnit)
){
    unitCategory=category
    break
}
}
if(unitCategory){
    const baseValue=inputValue * conversionRates[unitCategory][inputUnit]
    const result=baseValue / conversionRates[unitCategory][outputUnit]
    setConvertedValue(result)
}else{
    setConvertedValue(null)
    alert("Incompatible unit types selected")
}
}else{
    setConvertedValue(null);
    alert("Some fields are missing.");
}
}

    
    return (
        <>
<div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#ff2137] to-[#53e65a]">
<div className="max-w-md w-full p-6 bg-card rounded-lg space-y-3">
<h1 className="text-center text-2xl font-bold">Unit Converter</h1>
<p className="text-center text-gray-500 text-sm">Convert values between different units</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
<Label htmlFor="input-unit">From</Label>
<Select onValueChange={handleInputUnitChange}>
<SelectTrigger>
    <SelectValue placeholder="Select Unit"/>
</SelectTrigger>
<SelectContent>
    {Object.entries(unitTypes).map(([category,units])=>(
        <SelectGroup key={category}>
            <SelectLabel>
                {category.charAt(0).toUpperCase()+category.slice(1)}
            </SelectLabel>
            {units.map((unit)=>(
                <SelectItem key={unit} value={unit}>
                    {unit}
                    </SelectItem>
            ))}
        </SelectGroup>
    ))}
</SelectContent>
</Select>
    </div>


    <div className="space-y-2">
<Label htmlFor="output-unit">To</Label>
<Select onValueChange={handleOutputUnitChange}>
<SelectTrigger>
    <SelectValue placeholder="Select Unit"/>
</SelectTrigger>
<SelectContent>
    {Object.entries(unitTypes).map(([category,units])=>(
        <SelectGroup key={category}>
            <SelectLabel>
                {category.charAt(0).toUpperCase()+category.slice(1)}
            </SelectLabel>
            {units.map((unit)=>(
                <SelectItem key={unit} value={unit}>
                    {unit}
                    </SelectItem>
            ))}
        </SelectGroup>
    ))}
</SelectContent>
</Select>
    </div>



</div>
<div className="space-y-2">
    <Label htmlFor="input-value">Value</Label>
    <Input
    onChange={handleInputChange}
    type="number"
    placeholder="Enter value"
    value={inputValue||""}
    className="w-full"
    />
  
</div>
<Button
    onClick={convertValue}
    className="w-full font-bold rounded-full">
        Convert
    </Button>

    <div className="text-center">
        <div className="font-bold text-3xl">{convertedValue!==null?convertedValue.toFixed(2):0}</div>
        <div className="text-muted-foreground">{outputUnit?outputUnit:"Unit"}</div>
    </div>
    </div>
</div>
</>
    )
}