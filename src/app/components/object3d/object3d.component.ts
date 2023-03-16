import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { from, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { Unsubscribe } from 'src/app/core/decorators/class/unsubscribe';
import { EmptyClass } from 'src/app/core/mixins/base';
import { UnsubscribeMixin } from 'src/app/core/mixins/unsubscribe';
import { BusyService } from 'src/app/core/service/busy.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as GLTF from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3DConfig } from './config/object3d.config';

@Unsubscribe
@Component({
  selector: 'app-object-3d',
  templateUrl: './object3d.component.html',
  styleUrls: ['./object3d.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Object3DComponent extends UnsubscribeMixin(EmptyClass) implements AfterViewInit {
  @ViewChild('scene') private readonly _container: ElementRef<HTMLElement>;
  @HostListener('window:resize', ['$event']) private _onResize(event: Event) { this._onWindowResize(); }

  private _ready = false;
  private _controls: OrbitControls;
  private _animationFrameId: number;
  private _camera: THREE.PerspectiveCamera;
  private _model3d: THREE.Object3D<THREE.Event>;

  private _containerHeight: number;
  private _containerWidth: number;

  private readonly _scene = new THREE.Scene();
  private readonly _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  constructor(
    private readonly _busyService: BusyService
  ) { super(); }

  ngAfterViewInit(): void {
    this._reassignScreenDimensions();

    this._cameraSetup();
    this._controlsSetup();
    this._ambientSetup();
    this._pointSetup();
    this._rendererSetup();

    this._busyService.ready$.pipe(
      tap((ready: boolean) => this._ready = ready),
      switchMap(() => {
        return !!this._model3d ? of([]) :
          this._loadModel$(Object3DConfig.MODEL_PATH).pipe(
            tap((gltf: GLTF.GLTF) => {
              gltf.scene.name = Object3DConfig.MODEL_NAME;
              this._model3d = gltf.scene.getObjectByName(Object3DConfig.MODEL_NAME)!;
              this._scene.add(this._model3d);
            }),
            takeUntil(this.unsubscribe$)
          );
      }),
      tap(() => this._ready ? this._setDefaultAnimate() : this._setBusyAnimate()),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  private readonly _loadModel$ = (path: string): Observable<GLTF.GLTF> => from(new GLTF.GLTFLoader().loadAsync(path));

  private readonly _cameraSetup = (): void => {
    const [fov, aspect, near, far] = [8, this._containerWidth / this._containerHeight, 0.1, 1000];
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 1, 90);
  };

  private readonly _controlsSetup = (): void => {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.enableZoom = false;
    this._controls.addEventListener('start', () => this._setActiveAnimate());
    this._controls.addEventListener('end', () => this._setDefaultAnimate())
  };

  private readonly _ambientSetup = (): void => {
    const light = new THREE.AmbientLight(Object3DConfig.LIGHT.AMBIENT.color, 1.5);
    this._scene.add(light);
  };

  private readonly _pointSetup = (): void => {
    const light = new THREE.PointLight(Object3DConfig.LIGHT.POINT.color, 2.5);
    light.position.set(300, 100, 50);
    this._camera.add(light);
    this._scene.add(this._camera);
  };

  private readonly _rendererSetup = (): void => {
    this._renderer.setSize(this._containerWidth, this._containerHeight);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._container.nativeElement.appendChild(this._renderer.domElement);
  };

  private readonly _defaultAnimate = (): void => {
    this._model3d.rotation.y += 0.005;
    this._animationFrameId = requestAnimationFrame(this._defaultAnimate);
    this._container.nativeElement.style.zIndex = '';
    this._controls.enabled = true;
    this._renderer.render(this._scene, this._camera);
  }

  private readonly _setDefaultAnimate = (): void => {
    cancelAnimationFrame(this._animationFrameId);
    this._defaultAnimate();
  };

  private readonly _activeAnimate = (): void => {
    this._animationFrameId = requestAnimationFrame(this._activeAnimate);
    this._model3d.rotation.y += 0.05;
    this._container.nativeElement.style.zIndex = '';
    this._renderer.render(this._scene, this._camera);
  };

  private readonly _setActiveAnimate = (): void => {
    cancelAnimationFrame(this._animationFrameId);
    this._activeAnimate();
  };

  private readonly _busyAnimate = (): void => {
    this._animationFrameId = requestAnimationFrame(this._busyAnimate);
    this._model3d.rotation.y += 50;
    this._container.nativeElement.style.zIndex = '999';
    this._controls.enabled = false;
    this._renderer.render(this._scene, this._camera);
  };

  private readonly _setBusyAnimate = (): void => {
    cancelAnimationFrame(this._animationFrameId);
    this._busyAnimate();
  };

  private readonly _onWindowResize = (): void => {
    this._reassignScreenDimensions();
    this._camera.aspect = this._containerWidth / this._containerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(this._containerWidth, this._containerHeight);
  };

  private readonly _reassignScreenDimensions = (): void => {
    this._containerWidth = this._container.nativeElement.clientWidth;
    this._containerHeight = this._container.nativeElement.clientHeight;
  }
};
