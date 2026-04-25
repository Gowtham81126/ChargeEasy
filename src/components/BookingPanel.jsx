import { useState, useEffect } from 'react'
import { getMaxBookingDuration } from '../utils/timeAvailability'

function BookingPanel({ slot, onConfirm, onCancel }) {
  const [initialBattery, setInitialBattery] = useState(20) // Default 20%
  const [targetBattery, setTargetBattery] = useState(80) // Default 80%
  const [selectedConnector, setSelectedConnector] = useState(null)

  // Determine if charging station is 24/7
  const is24x7 = slot?.availability?.type === '24/7'

  const maxDuration = is24x7 ? Infinity : getMaxBookingDuration(slot)
  const pricePerKWh = slot.price

  // Get available connector types from the slot
  const availableConnectors = slot?.connectorTypes || ['Type 2']

  // Set default connector on mount
  useEffect(() => {
    if (availableConnectors.length > 0 && !selectedConnector) {
      setSelectedConnector(availableConnectors[0])
    }
  }, [availableConnectors, selectedConnector])

  // Estimate battery capacity (default 50kWh for typical EV)
  const batteryCapacity = 50 // kWh

  // Calculate energy needed (kWh)
  const energyNeeded = ((targetBattery - initialBattery) / 100) * batteryCapacity

  // Estimate charging time based on power level
  const powerLevel = slot?.powerLevel || 22 // kW
  const estimatedMinutes = energyNeeded > 0 ? (energyNeeded / powerLevel) * 60 : 0

  // Calculate total price
  const totalPrice = energyNeeded * pricePerKWh

  // Validate connector selection
  const isConnectorValid = selectedConnector && availableConnectors.includes(selectedConnector)

  // Validate battery levels
  const isBatteryValid = initialBattery >= 0 && initialBattery < 100 && targetBattery > initialBattery && targetBattery <= 100

  const handleConnectorChange = (connector) => {
    setSelectedConnector(connector)
  }

  const handleConfirm = () => {
    // Pass charging-specific data instead of duration
    onConfirm(estimatedMinutes, {
      initialBattery,
      targetBattery,
      connectorType: selectedConnector,
      estimatedEnergy: energyNeeded
    })
  }

  const isConfirmDisabled = !isBatteryValid || !isConnectorValid || energyNeeded <= 0 || (!is24x7 && estimatedMinutes > maxDuration)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Book Charging Session</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Slot Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="font-semibold text-blue-800">{slot.name}</p>
          <p className="text-sm text-blue-600">{slot.address}</p>
          <div className="flex items-center gap-2 mt-2">
            {slot.connectorTypes && slot.connectorTypes.map((connector, idx) => (
              <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                {connector}
              </span>
            ))}
            {slot.powerLevel && (
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                {slot.powerLevel}kW {slot.chargingType || 'AC'}
              </span>
            )}
          </div>
          <p className="text-sm text-blue-600 mt-1">
            Available: {slot.availableSlots} / {slot.totalSlots} slots
          </p>
        </div>

        {/* Availability Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Availability:</span> {slot.availability?.label || '24/7'}
          </p>
          {maxDuration < 24 * 60 && (
            <p className="text-xs text-amber-600">
              ⚠️ Maximum charging time: {Math.floor(maxDuration / 60)}h {maxDuration % 60}m
            </p>
          )}
        </div>

        {/* Battery Level Selection */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Battery Level</p>
          
          <div className="space-y-3">
            {/* Initial Battery */}
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Current Battery Level</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={initialBattery}
                  onChange={(e) => setInitialBattery(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-800 w-12 text-right">{initialBattery}%</span>
              </div>
            </div>

            {/* Target Battery */}
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Target Battery Level</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={targetBattery}
                  onChange={(e) => setTargetBattery(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-800 w-12 text-right">{targetBattery}%</span>
              </div>
            </div>
          </div>

          {/* Validation Error */}
          {!isBatteryValid && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ Target battery must be greater than current battery
            </p>
          )}
        </div>

        {/* Connector Type Selection */}
        {availableConnectors.length > 1 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Select Connector Type</p>
            <div className="flex flex-wrap gap-2">
              {availableConnectors.map((connector) => (
                <button
                  key={connector}
                  onClick={() => handleConnectorChange(connector)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedConnector === connector
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {connector}
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Charging Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Energy Needed</span>
            <span className="text-lg font-bold text-gray-800">
              {energyNeeded.toFixed(1)} kWh
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Est. Time</span>
            <span className="text-lg font-bold text-gray-800">
              {Math.floor(estimatedMinutes / 60)}h {Math.round(estimatedMinutes % 60)}m
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Estimate</span>
            <span className="text-2xl font-bold text-gray-800">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            ₹{pricePerKWh}/kWh × {energyNeeded.toFixed(1)} kWh
          </p>
          {!is24x7 && estimatedMinutes > maxDuration && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ Exceeds available time window (max: {Math.floor(maxDuration / 60)}h {maxDuration % 60}m)
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              isConfirmDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Start Charging
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingPanel
