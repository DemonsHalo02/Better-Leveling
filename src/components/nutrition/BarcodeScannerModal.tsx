import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { FoodItem, MealType } from '../../types';
import { lookupBarcode } from '../../lib/openFoodFacts';
import { X, Camera, Barcode, AlertCircle, Loader2, Check } from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFoodScanned: (food: FoodItem, mealType: MealType, servings: number) => void;
  defaultMealType?: MealType;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onFoodScanned,
  defaultMealType = 'breakfast',
}) => {
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [scannedFood, setScannedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState(1);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'reader-barcode-box';

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      setScannedFood(null);
      setScannerError(null);
      return;
    }

    // Try to auto-start camera
    startScanner();

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async () => {
    try {
      setScannerError(null);
      setIsScanning(true);

      const html5QrCode = new Html5Qrcode(scannerContainerId);
      html5QrCodeRef.current = html5QrCode;

      const qrCodeSuccessCallback = async (decodedText: string) => {
        // Stop scanning upon successful detection
        await stopScanner();
        await handleBarcodeDetected(decodedText);
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 160 },
          aspectRatio: 1.0,
        },
        qrCodeSuccessCallback,
        () => {
          // Frame scanner callback (can be noisy, ignore)
        }
      );
    } catch (err: unknown) {
      console.warn('Barcode camera access error:', err);
      setIsScanning(false);
      setScannerError('Camera access unavailable or declined. You can type the barcode numbers below.');
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  const handleBarcodeDetected = async (code: string) => {
    setIsLoadingProduct(true);
    setScannerError(null);
    try {
      const product = await lookupBarcode(code);
      if (product) {
        setScannedFood(product);
      } else {
        setScannerError(`No product found for barcode "${code}". Try entering food details manually.`);
      }
    } catch {
      setScannerError('Failed to retrieve product data. Please check internet connection.');
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleBarcodeDetected(manualCode.trim());
  };

  const handleConfirmAdd = () => {
    if (!scannedFood) return;
    onFoodScanned(scannedFood, mealType, servings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-900 border border-dark-750 w-full max-w-md rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Barcode size={18} />
            </div>
            <h3 className="font-bold text-dark-50 text-base">Scan Food Barcode</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Meal Slot Selector */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-dark-400 mb-1.5">Add to Meal</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setMealType(type)}
                className={`py-1.5 px-2 text-xs font-medium capitalize rounded-lg border transition ${
                  mealType === type
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'border-dark-750 text-dark-400 hover:text-dark-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Scanner Viewport */}
        {!scannedFood && (
          <div className="mt-4">
            <div className="relative rounded-xl overflow-hidden bg-dark-950 border border-dark-750 aspect-video flex flex-col items-center justify-center">
              <div id={scannerContainerId} className="w-full h-full" />

              {!isScanning && !isLoadingProduct && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-950/90 p-4 text-center">
                  <Camera size={32} className="text-dark-400 mb-2" />
                  <p className="text-xs text-dark-300 mb-3">
                    {scannerError || 'Camera paused. Click below to scan food packaging.'}
                  </p>
                  <button
                    onClick={startScanner}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition"
                  >
                    Start Camera
                  </button>
                </div>
              )}

              {isLoadingProduct && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-950/90">
                  <Loader2 size={32} className="text-emerald-400 animate-spin mb-2" />
                  <span className="text-xs font-mono text-dark-200">Looking up food details...</span>
                </div>
              )}
            </div>

            {/* Manual barcode input */}
            <form onSubmit={handleManualSearch} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Or enter barcode numbers..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 bg-dark-850 border border-dark-750 rounded-lg px-3 py-2 text-xs font-mono text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-emerald-500/50"
              />
              <button
                type="submit"
                disabled={isLoadingProduct || !manualCode.trim()}
                className="px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-medium border border-dark-700 transition disabled:opacity-50"
              >
                Lookup
              </button>
            </form>
          </div>
        )}

        {/* Scanned Food Result Card */}
        {scannedFood && (
          <div className="mt-4 p-4 rounded-xl bg-dark-850 border border-dark-750 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-dark-50">{scannedFood.name}</h4>
                {scannedFood.brand && (
                  <p className="text-xs text-dark-400">{scannedFood.brand}</p>
                )}
                <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                  Verified Barcode: {scannedFood.barcode}
                </span>
              </div>
              <button
                onClick={() => {
                  setScannedFood(null);
                  startScanner();
                }}
                className="text-xs text-dark-400 hover:text-dark-200 underline"
              >
                Scan Another
              </button>
            </div>

            {/* Serving Size & Quantity Adjuster */}
            <div className="flex items-center justify-between pt-2 border-t border-dark-800">
              <span className="text-xs text-dark-300">
                Serving Size: <strong className="text-dark-100">{scannedFood.servingUnit}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-dark-400">Servings:</span>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={servings}
                  onChange={(e) => setServings(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-16 bg-dark-900 border border-dark-700 rounded px-2 py-1 text-xs font-mono font-bold text-dark-50 text-center"
                />
              </div>
            </div>

            {/* Macro Breakdown */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-dark-800 text-center">
              <div className="p-1.5 rounded bg-dark-900">
                <span className="text-[10px] text-dark-400 block">Calories</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {Math.round(scannedFood.calories * servings)}
                </span>
              </div>
              <div className="p-1.5 rounded bg-dark-900">
                <span className="text-[10px] text-dark-400 block">Protein</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {(scannedFood.protein * servings).toFixed(1)}g
                </span>
              </div>
              <div className="p-1.5 rounded bg-dark-900">
                <span className="text-[10px] text-dark-400 block">Carbs</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {(scannedFood.carbs * servings).toFixed(1)}g
                </span>
              </div>
              <div className="p-1.5 rounded bg-dark-900">
                <span className="text-[10px] text-dark-400 block">Fat</span>
                <span className="text-xs font-mono font-bold text-purple-400">
                  {(scannedFood.fat * servings).toFixed(1)}g
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmAdd}
              className="w-full mt-2 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
            >
              <Check size={16} />
              Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            </button>
          </div>
        )}

        {scannerError && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-start gap-2">
            <AlertCircle size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-rose-300">{scannerError}</p>
          </div>
        )}
      </div>
    </div>
  );
};
