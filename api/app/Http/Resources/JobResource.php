<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'cost' => $this->cost,
            'description' => $this->description,
            'requiredSkills' => json_decode($this->required_skills),
            'message' => $this->message,
            "area" => AreaResource::collection([$this->area])->first(), // areaは1つしかない
            "languages" => LanguageResource::collection($this->languages),
            "features" => FeatureResource::collection($this->features),
            "skills" => SkillResource::collection($this->skills),
            "engineerTypes" => EngineerTypeResource::collection($this->engineerTypes),
        ];
    }
}
